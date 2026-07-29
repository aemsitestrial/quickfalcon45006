export default function decorate(block) {
  const stats = [...block.children].map((row) => {
    const [valueCell, labelCell] = [...row.children];
    return {
      value: valueCell?.innerHTML ?? '',
      label: labelCell?.innerHTML ?? '',
    };
  });

  block.innerHTML = '';

  stats.forEach(({ value, label }) => {
    const item = document.createElement('div');
    item.className = 'stats-item';
    item.innerHTML = `
      <span class="stats-value">${value}</span>
      <span class="stats-label">${label}</span>
    `;
    block.appendChild(item);
  });
}
