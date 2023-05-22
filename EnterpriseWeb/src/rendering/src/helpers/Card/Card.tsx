// Cards
import classNames from 'classnames';

export type CardBaseProps = {
  children: React.ReactNode | React.ReactNode[];
  dataComponent?: string;
};

const Card = ({ children, dataComponent }: CardBaseProps): JSX.Element => {
  return (
    <div
      className={classNames('theme-white m-0 flex h-full flex-col md:max-w-screen-lg lg:mx-auto')}
      data-component={dataComponent}
    >
      {children}
    </div>
  );
};
export default Card;
