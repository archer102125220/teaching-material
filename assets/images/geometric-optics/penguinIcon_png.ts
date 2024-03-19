/* eslint-disable */
import asyncLoader from '@/utils/phet-core/asyncLoader';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAABcRAAAXEQHKJvM/AAAEX0lEQVRogdVaTWgbRxR+I0sIK7bWiWIrCjSrlsQGGbwqJIoxJAjqurUgxVAovsm5xDfjhOYSE+Rbya1E7V0tKaQQgqG+lBQkRGxKwVjtwRgZI6tgCElsWbHjv1j7ymx2hbySYmlmXCUfjLQ7mtn3vvdm3sy8FUFE+JBhPU7dCSFeABgBgCAArABADBETQmUclwcIISOEwI+I4DD9dF0nU4oVRDTX1QZKQHTRrY5G6Th/HkvvKxSq/CSLHsehvNdC4M3dkIQTg5KmrOTxVFOcDqcglzzRBKRmy1/fXDyBO9Fz+PtYx7usPi5CntBJTAhpszbBxZ/CLu0+u16o1vQmIn4vQqZQAm5n0z2p2ULodXJpF65esMNO9Fzx99/+2YEbv6xt5V4XhChPYRH1IEKI/8Vm4fqzfAF+iG/CF/efQ3bt4FCbaz3NMHqlxXatx9EjSq4QAnToAMCUimB7tavC7cc5rT65tFfW9uZnTvvaa/VnEXJB4BCaBAC5tKLnYxeMjQyCpbkJAAsAKi0HcBIL8PWVtPK50jH85O/nD3kFcy9khBC6ysZL66RWB8w9+g68Z0/pyquA9NsgggXoH73/MjG31M5LQIQHJs0VkTvfwieXvwJAVVdY1cpbEqpGIHLHfvpq76cPk3/OD3NJ51y0gub4LssyHglVRVQPMDQ4+C/vOsA7icusPz4+fnQvQgBIE1wKBD7SAwA7OKzvN1tfkiTM5XJHe0BHPB7HgYGB4UZ5YMRcMTQ0BG1t9Rm0q6vrDI8DeAgEzRWUQD3w+/0wOzvr59CBi4BSeiNJUt0E6vVWJTAR0GP/IVBrNgKsHvA2RNsKaCiBjY0N7mcII8AynlOpFPT19aUYddAgjMCHNgeEIRqNNsQDQrCyomVSuCaCMAIsc4ASQMSGeKBMKMscWF9fzzLKL4KVQJnbWTyQz+e5zyMN9YDVan3JKL8IVgKH8piKolRv+Q6srq7uMsovgomAeeIFg2Vbo1qf84ypYwmYo5DD4Ugb1ywEEokE2Gy2RVb5BpgJbG9vb9JvWZbr3kYbWF5efsoq3wDPOnCafsRiMabO1AOLi4uNIaAfxOUamlZFJpNZRUTu7SirB2jMzNrt9j19O1A3RIRQHgIpRPS2t7cvTE9P192ZngMymUyeUfYhsIZRzfVOp/PXZDJZd/+pqSnweDz3WGRXUoartLS0FObn52vOBVGEQiHujJyozBy0trZu0IhSK2hbRHwiwPZvwWsBn8/3R2dnZ83W7+/vp8Ov7b3xwMLCwq10Og21RCNq/f39/QciwmcRnNnpIX1rjZFIpMzaNE9K85/GdW9vr7CxX9SBQ/lYaWLX7XaXKa8oCtIJTq8DgcDmxMSE/F4QMCtvFMPaVGmqPK0Lh8Po8/leud3uMdHK08L0iokQYn4vQNMs4e7ubu1kNjMzU61rVn8zz7Z8VwDTkQ4Ry15sEEIeuVyuL7e2tnYAYA4AKu31U0In8HH+W+V/AQD8B6VdahKAoaX2AAAAAElFTkSuQmCC';
export default image;