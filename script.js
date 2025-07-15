document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    // single click solo marca como aprobado visualmente
    ramo.classList.toggle('aprobado');
  });

  ramo.addEventListener('dblclick', () => {
    if (ramo.classList.contains('bloqueado')) return;

    const estabaAprobado = ramo.classList.contains('aprobado');
    ramo.classList.remove('aprobado');

    const desbloquear = ramo.dataset.desbloquea;
    if (!desbloquear) return;

    const nombres = desbloquear.split(',');

    nombres.forEach(nombre => {
      const target = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombre.trim());
      if (!target) return;

      // Revisión: si ningún otro ramo sigue aprobado que lo mantenga desbloqueado, lo bloqueamos
      const sigueBloqueado = Array.from(document.querySelectorAll('.ramo')).every(origen => {
        if (!origen.classList.contains('aprobado')) return true;
        const deps = origen.dataset.desbloquea?.split(',') || [];
        return !deps.includes(nombre.trim());
      });

      if (sigueBloqueado) {
        target.classList.add('bloqueado');
        target.classList.remove('aprobado');
      }
    });
  });
});
