document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.toggle('aprobado');

    if (ramo.classList.contains('aprobado')) {
      const desbloquear = ramo.dataset.desbloquea;
      if (desbloquear) {
        const nombres = desbloquear.split(',');
        nombres.forEach(nombre => {
          const target = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombre.trim());
          if (target && target.classList.contains('bloqueado')) {
            target.classList.remove('bloqueado');
          }
        });
      }
    }
  });
});

