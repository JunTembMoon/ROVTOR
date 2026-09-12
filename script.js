/* Edit these values when the real links are ready. */
const CONFIG = {
  version: '1.1.5',
  downloadUrl: 'https://github.com/JunTembMoon/ROVTOR/blob/main/files/ROVTOR%20Setup%201.1.5.exe',
  githubUrl: 'https://github.com/JunTembMoon/ROVTOR',
  releaseNotes: [
    ['새로운 기능', '여기에 실제 1.1.5 변경사항을 입력하세요.'],
    ['개선 사항', '여기에 실제 1.1.5 변경사항을 입력하세요.'],
    ['편의성', '여기에 실제 1.1.5 변경사항을 입력하세요.'],
    ['UI', '여기에 실제 1.1.5 변경사항을 입력하세요.'],
    ['버그 수정', '여기에 실제 1.1.5 변경사항을 입력하세요.']
  ]
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
let lastFocus;

function showToast(title, text) { $('#toastTitle').textContent = title; $('#toastText').textContent = text; $('.toast').classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => $('.toast').classList.remove('show'), 4600); }
function validUrl(url) { return url && !url.includes('YOUR_'); }
function useLink(type) { const url = type === 'github' ? CONFIG.githubUrl : CONFIG.downloadUrl; if (validUrl(url)) window.location.href = url; else showToast(type === 'github' ? 'GitHub 링크 준비 중' : '다운로드 링크 준비 중', '링크가 곧 추가됩니다. 조금만 기다려주세요!'); }

function modal(open) { const el = $('#launchModal'); if (open) { lastFocus = document.activeElement; el.classList.add('open'); document.body.style.overflow = 'hidden'; $('.modal-confirm').focus(); } else { el.classList.remove('open'); document.body.style.overflow = ''; lastFocus?.focus(); } }
function initModal() { const seen = localStorage.getItem('rovtor-release-115-seen'); if (!seen) setTimeout(() => modal(true), 450); $('.modal-close').onclick = () => modal(false); $('.modal-confirm').onclick = () => { localStorage.setItem('rovtor-release-115-seen', '1'); modal(false); }; $('.modal-explore').onclick = () => { localStorage.setItem('rovtor-release-115-seen', '1'); modal(false); $('#release').scrollIntoView({behavior:'smooth'}); }; $('#launchModal').onclick = e => { if (e.target === e.currentTarget) modal(false); }; document.addEventListener('keydown', e => { if (e.key === 'Escape') modal(false); }); }
function initNavigation() { const header = $('.site-header'), progress = $('.progress i'), top = $('.to-top'); window.addEventListener('scroll', () => { const y = scrollY, total = document.documentElement.scrollHeight - innerHeight; header.classList.toggle('scrolled', y > 30); top.classList.toggle('show', y > 600); progress.style.width = `${total ? y / total * 100 : 0}%`; }, {passive:true}); top.onclick = () => scrollTo({top:0,behavior:'smooth'}); const toggle = $('.menu-toggle'), nav = $('.site-header nav'); toggle.onclick = () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); }; $$('nav a').forEach(a => a.onclick = () => nav.classList.remove('open')); }
function initReveal() { const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }), {threshold:.12}); $$('.reveal').forEach(e => observer.observe(e)); }
function initEditor() { const typed = $('.typing-text'); if (typed) { const text = typed.textContent; typed.textContent = ''; let index = 0; const type = () => { if (index <= text.length) { typed.textContent = text.slice(0,index++); setTimeout(type, 42); } }; setTimeout(type, 1250); } $('.load-shot')?.addEventListener('click', () => showToast('스크린샷 불러오기', '실제 프로그램에서는 여기서 이미지 파일을 선택합니다.')); }
function initDemo() { const output = $('#demoOutput'); if (!output) return; let action = '*행동', color = '#ff9d4d', cycleTimer; const lines = ['[22:57:53] *행동 jacket 안에서 휴대폰을 꺼냅니다.', '[22:57:56] /do 화면이 밝게 켜진다.', '[22:57:58] /me unread messages를 확인한다.']; const paint = () => { output.innerHTML = `<div class="paste-document">${lines.map((line, i) => `<p class="paste-line" style="--line-delay:${i * 150}ms"><b>${line.slice(0,10)}</b> <strong style="color:${color}">${line.slice(11,15) === '*행동' ? action : line.slice(11,14)}</strong>${line.slice(line.indexOf(' ', 11) + 1)}</p>`).join('')}</div>`; setTimeout(() => { const copies = document.createElement('div'); copies.className = 'paste-copies'; copies.innerHTML = '<span>PASTE × 12</span><span>PASTE × 24</span><span>PASTE × 48</span>'; output.append(copies); }, 980); setTimeout(() => output.classList.add('deleting'), 2050); setTimeout(() => { output.innerHTML = '<span class="paste-empty">다시 복붙할 준비 완료.</span>'; output.classList.remove('deleting'); }, 2740); };
  const loop = () => { paint(); cycleTimer = setTimeout(loop, 3000); }; loop();
  $$('.demo-action').forEach(b => b.onclick = () => { action = b.dataset.demo.trim(); $$('.demo-action').forEach(x => x.classList.remove('active')); b.classList.add('active'); clearTimeout(cycleTimer); paint(); cycleTimer = setTimeout(loop, 3000); });
  $$('.demo-color').forEach(b => b.onclick = () => { color = b.dataset.demoColor; clearTimeout(cycleTimer); paint(); cycleTimer = setTimeout(loop, 3000); }); }
function initMeters() { const meter = $('.meter'); const observer = new IntersectionObserver(entries => { if(entries[0].isIntersecting) { meter.classList.add('animated'); observer.disconnect(); } },{threshold:.35}); observer.observe(meter); }
function renderNotes() { $('#releaseCards').innerHTML = CONFIG.releaseNotes.map(([title,text], i) => `<article class="release-card"><b>0${i+1} / ${title}</b><p>${text}</p></article>`).join(''); }
function initActions() { $$('.js-download').forEach(b => b.addEventListener('click', () => useLink('download'))); $$('.js-github').forEach(b => b.addEventListener('click', () => useLink('github'))); $('.toast-close').onclick = () => $('.toast').classList.remove('show'); }
function initRoveEasterEgg() { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const section = $('#developer'), overlay = $('.rove-overlay'); if (!section || !overlay) return; const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) return; observer.disconnect(); setTimeout(() => { overlay.classList.add('party'); setTimeout(() => { overlay.classList.remove('party'); overlay.classList.add('sorry'); setTimeout(() => overlay.classList.remove('sorry'), 950); }, 2000); }, 1000); }, {threshold:.45}); observer.observe(section); }
renderNotes(); initModal(); initNavigation(); initReveal(); initEditor(); initDemo(); initMeters(); initActions(); initRoveEasterEgg();
