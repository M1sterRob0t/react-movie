import './rating.css';
import StarFilled from '@ant-design/icons/StarFilled';
import StarTwoTon from '@ant-design/icons/StarTwoTone';

function RatingItemFilled(): JSX.Element {
  return (
    <li className="rating__item">
      <StarFilled className="rating__star rating__star--filled" />
    </li>
  );
}

function RatingItemEmpty(): JSX.Element {
  return (
    <li className="rating__item">
      <StarTwoTon className="rating__star rating__star--empty" />
    </li>
  );
}

function RatingItemHalfFilled(): JSX.Element {
  return (
    <li className="rating__item">
      <StarTwoTon className="rating__star rating__star--empty" />
      <StarFilled className="rating__star rating__star--half-filled" />
    </li>
  );
}

interface IRating {
  filmRating: number;
  className: string;
}

function Rating({ filmRating, className }: IRating): JSX.Element {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    const isWithAHalf = i - filmRating === 0.5;
    if (i > filmRating && isWithAHalf) stars.push(<RatingItemHalfFilled key={i} />);
    else if (i <= Math.round(filmRating)) stars.push(<RatingItemFilled key={i} />);
    else stars.push(<RatingItemEmpty key={i} />);
  }

  return <ul className={`${className} rating`}>{stars}</ul>;
}

export default Rating;
