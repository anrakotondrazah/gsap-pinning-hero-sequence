import { Fragment } from "react";

interface WordsProps {
  text: string;
  className?: string;
}

/** Découpe un texte en mots animables (équivalent SplitText, sans dépendance). */
export default function Words({ text, className = "" }: WordsProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span data-word className={`inline-block will-change-transform ${className}`}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
