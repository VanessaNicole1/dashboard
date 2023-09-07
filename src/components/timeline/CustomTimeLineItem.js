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
import { convertToSpanishDate } from '../../sections/dashboard/period/list/utils/date.utils';

export const CustomTimeLineItem = ({ item, isFirst = false, isLast = false }) => {
  const dateInformation = item.date ? convertToSpanishDate(new Date(item.date)) : '';
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {dateInformation}        
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