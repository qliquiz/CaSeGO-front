import '../styles/case.scss';

export interface CaseProps {
  id: number;
  name: string;
  image: string;
}

const Case = ({
  id,
  name,
  image
}: CaseProps) => {
  return (
    <div className="case">
      <div className="case-inner" id={String(id)}>
        <img src={image} alt={name} />
        <div className="case-text">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Case;
