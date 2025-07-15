document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    const aprobado = ramo.classList.toggle('aprobado');
    const desbloquear = ramo.dataset.desbloquea;
    if (!desbloquear) return;

    const nombres = desbloquear.split(',');

    nombres.forEach(nombre => {
      const target = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombre.trim());
      if (!target) return;

      if (aprobado) {
        target.classList.remove('bloqueado');
      } else {
        const sigueBloqueado = Array.from(document.querySelectorAll('.ramo')).every(origen => {
          if (!origen.classList.contains('aprobado')) return true;
          const deps = origen.dataset.desbloquea?.split(',') || [];
          return !deps.includes(nombre.trim());
        });

        if (sigueBloqueado) {
          target.classList.add('bloqueado');
          target.classList.remove('aprobado');
        }
      }
    });
  });
});
