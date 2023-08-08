export function hideLongDescription(desc: string, maxDescLength: number): string {
  if (desc.length > maxDescLength) {
    const wordsArray = desc.split(' ');
    let descLength = 0;
    let index = -1;
    for (let i = 0; i < wordsArray.length; i++) {
      if (descLength < maxDescLength) {
        descLength += wordsArray[i].length;
      } else {
        index = i;
        break;
      }
    }
    return wordsArray.slice(0, index).join(' ') + ' ...';
  } else {
    return desc;
  }
}
