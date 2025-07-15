// Cargar materias aprobadas al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");

  document.querySelectorAll(".ramo").forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    if (aprobadas.includes(nombre)) {
      ramo.classList.add("aprobado");
      const desbloquear = ramo.dataset.desbloquea?.split(",") || [];
      desbloquear.forEach(nombreHijo => {
        const hijo = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombreHijo.trim());
        if (hijo) hijo.classList.remove("bloqueado");
      });
    }
  });
});

// Manejo de clics
document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    const aprobado = ramo.classList.toggle('aprobado');
    const nombre = ramo.dataset.nombre;
    let aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");

    if (aprobado) {
      aprobadas.push(nombre);
    } else {
      aprobadas = aprobadas.filter(n => n !== nombre);
    }
    localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));

    const desbloquear = ramo.dataset.desbloquea;
    if (!desbloquear) return;

    const nombres = desbloquear.split(',');

    nombres.forEach(nombreHijo => {
      const target = Array.from(document.querySelectorAll('.ramo')).find(el => el.dataset.nombre === nombreHijo.trim());
      if (!target) return;

      if (aprobado) {
        target.classList.remove('bloqueado');
      } else {
        // Revisión: si ningún otro ramo mantiene abierta esta materia, la bloqueamos
        const sigueBloqueado = Array.from(document.querySelectorAll('.ramo')).every(origen => {
          if (!origen.classList.contains('aprobado')) return true;
          const deps = origen.dataset.desbloquea?.split(',') || [];
          return !deps.includes(nombreHijo.trim());
        });

        if (sigueBloqueado) {
          target.classList.add('bloqueado');
          target.classList.remove('aprobado');
        }
      }
    });
  });
});
