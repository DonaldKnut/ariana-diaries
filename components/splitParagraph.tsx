import React from "react";

export const splitParagraph = (text: string): JSX.Element[] => {
  const MIN_LENGTH = 100;
  const paragraphs: JSX.Element[] = [];
  const sentences = text.split(". ");

  let currentParagraph = "";

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];

    if (currentParagraph.length === 0) {
      currentParagraph = sentence + ". ";
    } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
      currentParagraph += sentence + ". ";
    } else {
      paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
      currentParagraph = sentence + ". ";
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
  }

  return paragraphs;
};
