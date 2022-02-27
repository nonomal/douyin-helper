import AutoShowComment from './cards/AutoShowComment';
import EnhanceDescription from './cards/EnhanceDescription';
import ShowPublishTime from './cards/ShowPublishTime';
import AutoHideCursor from './cards/AutoHideCursor';

export interface Props {
  className: string;
}

export default function FunctionList({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-y-6">
        <AutoShowComment />
        <EnhanceDescription />
        <ShowPublishTime />
        <AutoHideCursor />
      </div>
    </div>
  );
}
