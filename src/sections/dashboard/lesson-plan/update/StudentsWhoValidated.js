import PropTypes from "prop-types";
import orderBy from "lodash/orderBy";
import { alpha } from "@mui/material/styles";
import { Box, Stack, Card, CardHeader, Typography } from "@mui/material";
import Iconify from "../../../../components/iconify";
import CustomAvatar from "../../../../components/custom-avatar/CustomAvatar";

StudentsWhoValidated.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function StudentsWhoValidated({
  title,
  subheader,
  list,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader
        title={
          <Typography variant="h6" style={{ fontSize: "16px" }}>
            {title}
          </Typography>
        }
        subheader={subheader}
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ["favourite"], ["desc"]).map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

AuthorItem.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
    isValidated: PropTypes.bool,
  }),
  index: PropTypes.number,
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Avatar alt={author.name} src={author.avatar} /> */}
      <CustomAvatar
        src={author?.name}
        alt={author?.name}
        name={`${author?.name} ${author?.name}`}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Iconify
            icon="icon-park-outline:email-down"
            width={16}
            sx={{ mr: 0.5 }}
          />
          {author.email}
        </Typography>
      </Box>

      {author.isValidated && (
        <Iconify
          icon="gg:check-o"
          sx={{
            p: 1,
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "primary.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          }}
        />
      )}
      {!author.isValidated && (
        <Iconify
          icon="tabler:xbox-x"
          sx={{
            p: 1,
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            ...(index === 1 && {
              color: "error.main",
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
            }),
          }}
        />
      )}
    </Stack>
  );
}
