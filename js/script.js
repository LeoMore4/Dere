document.querySelectorAll('.ramo').forEach(ramo => {
  // SINGLE CLICK = aprobar ramo y desbloquear dependientes
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
      }
    });
  });

  // DOUBLE CLICK = desaprobar ramo y volver a bloquear dependientes si nadie más los mantiene abiertos
  ramo.addEventListener('dblclick', () => {
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.remove('aprobado');

    const desbloquear = ramo.dataset.desbloquea;
    if (!desbloquear) return;

    const nombres = desbloquear.split(',');

    nombres.forEach(nombre => {
      const target = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombre.trim());
      if (!target) return;

      // Revisión: si ningún otro ramo aprobado lo mantiene desbloqueado, lo volvemos a bloquear
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
