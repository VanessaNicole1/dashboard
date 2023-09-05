import PropTypes from "prop-types";
import {
  Box,
  Card,
  Rating,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";
import { fCurrency, fShortenNumber } from "../../../../utils/formatNumber";
import Label from "../../../../components/label";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import FileRecentItem from "../../../file-manager/file-recent-item";

StudentManualSection.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  iconName: PropTypes.string,
  subheader: PropTypes.string,
};

export default function StudentManualSection({
  title,
  iconName,
  subheader,
  list,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          <ApplicationItem />
        </Stack>
      </Scrollbar>
    </Card>
  );
}

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    review: PropTypes.number,
    system: PropTypes.string,
    shortcut: PropTypes.string,
    resource: PropTypes.string,
  }),
};

function ApplicationItem({ app }) {
  const { shortcut, system, price, rating, review, name, resource } = app;

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Recursos de la clase:
      </Typography>
      <FileRecentItem
        file={resource}
        onDelete={() => console.info("DELETE", resource)}
      />
    </Stack>
  );
}
