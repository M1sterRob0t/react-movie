import './rating-number.css';

interface IRatingNumberProps {
  evaluation: number | null;
}

function RatingNumber({ evaluation }: IRatingNumberProps): JSX.Element {
  let borderColor: string;
  const display = evaluation !== null ? 'flex' : 'none';

  if (evaluation === null) borderColor = 'none';
  else if (evaluation <= 3) borderColor = '#E90000';
  else if (evaluation <= 5) borderColor = '#E97E00';
  else if (evaluation <= 7) borderColor = '#E9D100';
  else borderColor = '#66E900';

  return (
    <div className="movie__rating-number rating-number" style={{ borderColor, display }}>
      {evaluation}
    </div>
  );
}

export default RatingNumber;
