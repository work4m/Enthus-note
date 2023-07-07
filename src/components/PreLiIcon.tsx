import { memo } from 'react';
import { IconFolder } from '@tabler/icons-react';

const PreLiIcon = () => {
    return (
        <IconFolder
            className='prelist-folder-icon'
            size={"18px"}
            stroke={"1.7px"}
        />
    )
}

export default memo(PreLiIcon);