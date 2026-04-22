## Debugging

### Antes de empezar: tomar una instantánea

Siempre haz un `git commit` antes de depurar. No confíes únicamente
en el rebobinado (rewind), ya que solo revierte ediciones directas de
archivos, no efectos secundarios de scripts ejecutados.

---

### Modo 1: Rápido (para problemas simples)

1. Copia el stack trace o mensaje de error tal cual.
2. Pégalo directamente en el chat sin explicaciones adicionales.
3. Aplica el fix y repite si hace falta.
4. Si empeora o no avanza en 2-3 intentos → restaura el último commit
   y pasa al Modo 2.

---

### Modo 2: Disciplinado (para problemas persistentes)

Trabaja con un único archivo `debug.md` donde documentarás todo el proceso.

**Paso 1 — Reproducir**
Reproduce el bug de forma consistente antes de hacer nada más.
Documenta en `debug.md` exactamente cómo se reproduce.

**Paso 2 — Investigar**
- Revisa todos los logs relacionados.
- Añade logging extra si es necesario.
- Busca en la web si otros han reportado el mismo problema.
- ⚠️ Alerta roja: si encuentras un issue antiguo o un post de Stack
  Overflow que "encaja exactamente", cuestiona si realmente es el mismo
  problema. Verifica: ¿más de una persona lo reportó? ¿La versión y el
  contexto coinciden? No instales paquetes antiguos ni reescribas código
  basándote en un caso aislado de hace años.

**Paso 3 — Hipótesis**
Lista las posibles causas en `debug.md`. Para cada hipótesis, exige
pruebas concretas antes de actuar sobre ella.

**Paso 4 — Causa raíz**
Cuando identifiques la causa raíz, demuéstrala: el bug debe reproducirse
con ella presente y desaparecer al eliminarla. Documenta la prueba en
`debug.md`.

**Paso 5 — Aplicar y verificar el fix**
Aplica el fix y confirma que el bug ya no se reproduce de forma
consistente.

**Paso 6 — Documentar lecciones aprendidas**
Actualiza `CLAUDE.md` con:
- Qué causó el bug.
- Cómo se detectó y se resolvió.
- Qué hacer (o evitar) para no repetirlo.

---

### Si el Modo 2 se desvía

Si Claude empieza a ir por las ramas o propone reescrituras grandes
basadas en suposiciones:

1. Detente.
2. Restaura desde el último commit.
3. Indica explícitamente qué camino NO es el problema.
4. Reinicia el Modo 2 desde el Paso 1.

---

### Consejo extra: usar un segundo LLM

Si el problema es muy difícil, pásalo a otro modelo (Gemini, Codex, etc.)
con el mismo contexto. Cada modelo tiene un entrenamiento diferente y
puede detectar lo que el primero pasó por alto. Es especialmente útil
en bugs que llevan muchos intentos sin resolverse.