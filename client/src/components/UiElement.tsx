import React from 'react';
import { IElement } from '../utils/types';

interface IProps {
  img: string;
  title: string;
  setPlayedElement: (element: IElement) => void;
  hasPlayed: boolean;
}

const UiElement: React.FC<IProps> = ({
  img,
  title,
  setPlayedElement,
  hasPlayed,
}: IProps) => {
  const onClickElement = (element: IElement) => {
    setPlayedElement(element);
  };

  return (
    <button
      onClick={onClickElement.bind(null, { img, title })}
      disabled={hasPlayed}
    >
      <div>
        <i className={img} />
      </div>
      <div>{title}</div>
    </button>
  );
};

export default UiElement;
