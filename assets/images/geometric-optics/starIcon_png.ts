/* eslint-disable */
import asyncLoader from '@/utils/phet-core/asyncLoader';

const image = new Image();
const unlock = asyncLoader.createLock(image);
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAABcRAAAXEQHKJvM/AAADfUlEQVRoge1aTUtbQRQ9U4rBqlUJERUhD41EIZIQaoILQboRjIt2nYWu3bhxXcFtu/Ef+A8UShdd2UU3YtGALgWzNhTjR5WoMOX4Ohjbl2TGvEki9MLgY96995xzbzKZeU8hpcRzthfPmr1tARMTYoXDJobVj1AoJC74t1CQXbYwrHWAlc9k0MlhswvWOsDq7+6ik9eTk7i01QUrHRgYEEuzs2hzHICD15yzgQV2wO/R24vi8fFDWl5zzgaW7x1gpefm0M7KK+M156x0wXb1bXfB1w44jsj+Xf2He24X6OMnpq/ViESQ96p+eRfo05IdGB8X8+k0Bryqr4z36ENfv3AbVn1bXfClAzrVV+Z7FxpZfRtdqKsDQgiHa7tu9ZWpLjCWOeriIGvshf4AOMkkMkIgdHaGmVIJHaEQXvb1oS2dxqvFRZeUieXzwMYGsLODq5MT3BQKuAsE8Ku7G9+kRGFvD1/oJqXM1xQghOgBkIjF8CYQQMyLpNrXJBJAT089NatsxSKQy7niOLzElUo4PDzEDwA5KWVRAHgHYHN5+YGgIttKpkQpgevr9+Te338RYjGsRKO4Oj31bVW1NsiRXMn5/uOvkPr7sdTqIhR5clWTjzxaWYQX+X8EtKqISuQ9BXCEw8imUrhoBRHkQC7k5OVQMTKVwjQD9/ebR57Y5EAulZyqZmDg4CBKzRBBTGJXI19TQLNE6JLXEtBoESbktQU0SoQpeSMB0t30JTo6cGtLAHMTwyTIaDstpcxFo7i0tUVibmKYxBgJEELMTE/D0l4UYG5imMQYCeB22+YulbmJYRJjJIBnBW63bRlzE8OaAB50bAsghkmMkYDbW3TZOo3RmJsYJjFGAoJB++/UTDG0nZ+yAvHQzmFipiuRtoCREbzVXYG2toChIdytreErB685p2PEIJa2Zt1fvGQSn7e3q7vx/tQUruNxfCeXsl9wh3O8p5ODWL5vJdwnadWJj45ir5y4x1bEoU8tISZP7bQFDA/z5cTjaT4izGRwQ8CxMczr5qIvYxjr9UjSxfJRAFc4nozKiWezKJkSrySEucqFEIuYfgqYWV11z6cLC5DBIM4rnVGfMpiLOZmbGMQipm8Ckkl8jMchw2H8VA+UbAzmJgaxiKmDofWiOxIRa+3tOD84kJ+0l7c6jG/2r6/x+uhIfqiV5f+/2zTVAPwG4S8oGHGoKLQAAAAASUVORK5CYII=';
export default image;