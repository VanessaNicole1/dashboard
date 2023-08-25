import PropTypes from 'prop-types';
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { TimeLineIcon } from "./TimeLineIcon";

export const CustomTimeLineItem = ({ item, isFirst = false, isLast = false }) => {
  const itemDate = new Date();
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {itemDate.toLocaleDateString()}        
      </TimelineOppositeContent>
      <TimelineSeparator>
        {!isFirst && <TimelineConnector />}
        <TimeLineIcon item={item} />
        { !isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ py: isFirst || isLast ? "12px": "40px", px: 2 }}>
        <Typography variant="h6" component="span">
          {item.name}
        </Typography>
        <Typography>{item.description}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

CustomTimeLineItem.propTypes = {
  item: PropTypes.object,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
};