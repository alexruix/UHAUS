import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "@phosphor-icons/react";

const Icons = ({ data, sizeIcon }) => {
  const PHIcon = Icon[humanize(data)];

  return PHIcon ? <PHIcon size={sizeIcon} /> : null;
};

export default Icons;
