import AutoShowComment from './cards/AutoShowComment';
import ShowPublishTime from './cards/ShowPublishTime';
import RemapShortcut from './cards/RemapShortcut';
import SearchSelection from './cards/SearchSelection';
import DownloadVideo from './cards/DownloadVideo';
import More from './cards/More';

export interface Props {
  className: string;
}

export default function FunctionList({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-y-6">
        <DownloadVideo />
        <AutoShowComment />
        <RemapShortcut />
        <ShowPublishTime />
        <SearchSelection />
        <More />
      </div>
    </div>
  );
}
