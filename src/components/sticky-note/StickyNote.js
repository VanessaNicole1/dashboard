import React from "react";
import PropTypes from "prop-types";

import { Card, Typography } from "@mui/material";
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
  identifier: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

function StickyNote({ title, content, identifier, className, color }) {
  const isDesktop = useResponsive('up', 'sm');
  const words = isDesktop ? content.split(" "): [content];

  return (
    <StickyNoteCard
      style={{ backgroundColor: color, width: isDesktop ? 120: '100%', height: isDesktop ? 70: 30, marginTop: isDesktop ? 0: 10 }}
      className={className}
      data-id={identifier}
      data-color={color}
      title={title}
    >
      <Typography variant="body2" align="center">
        {words.map((word, index) => (
          <CenteredWord key={index}>{word}</CenteredWord>
        ))}
      </Typography>
    </StickyNoteCard>
  );
}

export default StickyNote;
