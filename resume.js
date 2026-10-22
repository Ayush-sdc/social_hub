(() => {
  const trigger=document.querySelector('[data-link="resume"]');
  const modal=document.createElement('dialog');
  modal.className='resume-dialog';modal.id='resume-dialog';
  modal.setAttribute('aria-labelledby','resume-title');
  modal.innerHTML=`<header><h2 id="resume-title">Résumé</h2><button type="button" class="resume-close" aria-label="Close résumé">&times;</button></header>
    <div class="resume-content"><iframe title="Résumé preview and download" hidden></iframe></div>
    <footer><a class="resume-open" target="_blank" rel="noopener noreferrer">Open full size ↗</a></footer>`;
  document.body.append(modal);
  const frame=modal.querySelector('iframe'),open=modal.querySelector('.resume-open');
  trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls',modal.id);
  trigger.addEventListener('click',()=>{
    const url=new URL(window.PORTFOLIO.resumeViewer);
    open.href=url.href;
    url.searchParams.set('embedded','1');
    url.searchParams.set('v',Date.now().toString());
    frame.src=url.href;frame.hidden=false;
    modal.showModal();modal.querySelector('.resume-close').focus();
  });
  modal.querySelector('.resume-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{const r=modal.getBoundingClientRect();if(e.target===modal&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))modal.close();});
  modal.addEventListener('close',()=>{frame.removeAttribute('src');frame.hidden=true;trigger.focus();});
})();
