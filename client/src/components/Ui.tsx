import React from 'react';
import { scissors, rock, paper } from '../utils/data';
import UiElement from './UiElement';
import { IElement } from '../utils/types';

interface IProps {
  setPlayedElement: (e: IElement) => void;
  hasPlayed: boolean;
}

const Ui: React.FC<IProps> = ({ setPlayedElement, hasPlayed }) => {
  return (
    <div>
      <UiElement
        img={scissors.img}
        title={scissors.title}
        setPlayedElement={setPlayedElement}
        hasPlayed={hasPlayed}
      />
      <UiElement
        img={rock.img}
        title={rock.title}
        setPlayedElement={setPlayedElement}
        hasPlayed={hasPlayed}
      />
      <UiElement
        img={paper.img}
        title={paper.title}
        setPlayedElement={setPlayedElement}
        hasPlayed={hasPlayed}
      />
    </div>
  );
};

export default Ui;
