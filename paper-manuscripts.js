(() => {
  const config = window.PAPER_CONFIG;
  const mount = document.querySelector('[data-paper-dossier]');
  if (!config || !mount) return;
  const notes = config.notes;
  const modifiers = config.modifiers || ['연구자는 이 대목에서 고개를 세 번 끄덕인 뒤, 왜 이걸 보고서로 쓰는지 잠깐 잊었습니다.', '피험자는 남은 시간을 발견했고, 그것이 원래 자기 것이었다는 사실에 약간 놀랐습니다.', '이 결론은 공식 단위가 아니라 사용자의 표정으로 측정되었습니다.'];
  const entries = Array.from({length: 96}, (_, index) => {
    const note = notes[index % notes.length];
    const modifier = modifiers[Math.floor(index / notes.length) % modifiers.length];
    return `<article class="dossier-note"><header><span>FIELD NOTE ${String(index + 1).padStart(3, '0')}</span><b>검토: 대체로 완료</b></header><h3>${note[0]}</h3><p>${note[1]} ${modifier}</p><footer>${note[2]}</footer></article>`;
  }).join('');
  mount.innerHTML = `<section class="paper-dossier"><div class="dossier-intro"><p class="dossier-kicker">${config.label} / 확장 부록 · 읽을거리 과다 공급</p><h2>${config.heading}<br><em>${config.emphasis}</em></h2><p class="dossier-summary">${config.summary}</p></div><div class="dossier-ledger">${entries}</div><div class="dossier-final"><p>${config.final}</p></div></section>`;
})();
