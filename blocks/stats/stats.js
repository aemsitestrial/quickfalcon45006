export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [valueCell, labelCell] = [...row.children];

    row.classList.add('stats-item');

    if (valueCell) valueCell.classList.add('stats-value');
    if (labelCell) labelCell.classList.add('stats-label');
  });
}
