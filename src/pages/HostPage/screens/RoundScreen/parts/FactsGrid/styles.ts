import { Flex } from "antd";
import styled from "styled-components";

export const GridFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  gap: 20px;
  margin: -20px -20px 0 -20px;
  padding: 20px;
  overflow: hidden;
`;

export const FactBlock = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 10px 40px;
  height: 100%;
  width: 100%;
  justify-content: center;
  text-align: center;
  > * {
    margin: auto;
  }
`;

export const PlayerWithFact = styled(Flex)<{
  $height: string;
  $guessStatus?: "nobody" | "guessed" | "not_guessed";
  $index: number;
}>`
  gap: 2px;
  height: ${({ $height }) => $height};
  border-radius: 4px;
  transform: skew(-4deg);
  clip-path: polygon(-20% -4%, 109% 6%, 96% 96%, 4% 104%);

  box-shadow: inset
    ${({ theme, $guessStatus }) =>
      $guessStatus === "guessed"
        ? theme.token.colorSuccessActive
        : $guessStatus === "not_guessed"
          ? theme.token.colorErrorActive
          : $guessStatus === "nobody"
            ? theme.token.colorWarningActive
            : theme.token.colorTextBase}
    0px 0px 10px 4px;

  > :first-child {
    clip-path: polygon(-20% -4%, 109% 6%, 96% 96%, 4% 104%);

    box-shadow: ${({ theme, $guessStatus }) =>
        $guessStatus === "guessed"
          ? theme.token.colorSuccessActive
          : $guessStatus === "not_guessed"
            ? theme.token.colorErrorActive
            : $guessStatus === "nobody"
              ? theme.token.colorWarningActive
              : theme.token.colorTextBase}
      0px 0px 10px 4px;
    transform: skew(8deg);
    scale: 0.8;
    > * {
      transform: skew(-4deg);
    }
  }

  transition-property: box-shadow;
  transition-duration: 0.5s;
  transition-delay: ${({ $index, $guessStatus }) =>
    $guessStatus === undefined ? 0 : $index + 1}s;
  > * {
    transition-property: box-shadow;
    transition-duration: 0.5s;
    transition-delay: ${({ $index, $guessStatus }) =>
      $guessStatus === undefined ? 0 : $index + 1}s;

    > * {
      transform: skew(4deg);
    }
  }
`;
