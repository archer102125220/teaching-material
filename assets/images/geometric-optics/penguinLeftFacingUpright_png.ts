/* eslint-disable */
import asyncLoader from '@/utils/phet-core/asyncLoader';

const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;