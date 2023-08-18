import React from "react";
import PropTypes from "prop-types";

import { Card, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import useResponsive from "../../hooks/useResponsive";

const StickyNoteCard = styled(Card)({
  padding: "1.5rem",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CenteredWord = styled("span")({
  display: "inline-block",
  textAlign: "center",
  fontWeight: "bold",
});

StickyNote.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  description: PropTypes.string,
  identifier: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

function StickyNote({ title, content, description = "", identifier, className, color }) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <StickyNoteCard
      style={{ backgroundColor: color, width: isDesktop ? 120: '100%', height: isDesktop ? 100: 30, marginTop: isDesktop ? 0: 10 }}
      className={className}
      data-id={identifier}
      data-color={color}
      title={title}
    >
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="body2" align="center">
          <b>{content}</b>
        </Typography>
        {
          description && (
            <Typography variant="caption" align="center">
              {description}
            </Typography>
          )
        }
      </div>
      
    </StickyNoteCard>
  );
}

export default StickyNote;
