import React from 'react';
import { IElement } from '../utils/types';

const ImgContainer = ({ img, title }: IElement) => {
  return (
    <div>
      <div>
        <i className={img} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default ImgContainer;
