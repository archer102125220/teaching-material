/* eslint-disable */
import asyncLoader from '@/utils/phet-core/asyncLoader';

const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;