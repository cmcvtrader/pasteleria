# ❌ GUÍA: CANCELAR Y GESTIONAR PEDIDOS

## 🎯 NUEVA FUNCIONALIDAD IMPLEMENTADA

### **Cancelación de Pedidos**

¡Ahora puedes cancelar pedidos! Cuando un cliente cambia de opinión, cancela, o hay un error, puedes marcar el pedido como cancelado de forma profesional.

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### 1. **Botón de Cancelar Pedido** ❌
- Cada pedido tiene un botón rojo "❌ Cancelar Pedido"
- Disponible para pedidos Pendientes y Entregados
- No disponible para pedidos ya cancelados

### 2. **Confirmación de Seguridad** ⚠️
- Modal de confirmación antes de cancelar
- Muestra información del pedido (cliente y producto)
- Opciones: "No, conservar" o "Sí, cancelar"

### 3. **Sistema de Filtros** 🔍
- **Todos**: Ver todos los pedidos
- **Pendientes**: Solo pedidos activos
- **Entregados**: Pedidos completados
- **Cancelados**: Pedidos cancelados

### 4. **Impacto en Finanzas** 💰
- Los pedidos cancelados **NO** se incluyen en cálculos financieros
- Las finanzas muestran: "(sin cancelados)"
- Mantiene historial preciso

### 5. **Impresión Inteligente** 🖨️
- Los pedidos cancelados **NO** aparecen en la agenda impresa
- Solo se imprimen pedidos activos

---

## 🔄 CÓMO FUNCIONA

### **Cancelar un Pedido**

```
1. Ve a la pestaña "📅 Agenda"
   ↓
2. Localiza el pedido a cancelar
   ↓
3. Haz clic en "❌ Cancelar Pedido"
   ↓
4. Confirma en el modal
   ↓
5. El pedido se marca como CANCELADO
```

### **Visual del Pedido Cancelado**

```
┌─────────────────────────────────────┐
│ 👤 Diana Gutierrez     [CANCELADO] │ ← Badge rojo
├─────────────────────────────────────┤
│ 🧁 1x Tarta de Chocolate            │
│                                     │
│ Fondo más claro (opacidad 60%)     │ ← Visual atenuado
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 DIFERENCIAS VISUALES

| Estado | Badge | Fondo | Botones Disponibles |
|--------|-------|-------|---------------------|
| **Pendiente** | Azul claro | Normal | Entregar, Pagar, Comanda, Cancelar |
| **Entregado** | Verde | Normal | Pagar (si debe), Comanda, Cancelar |
| **Cancelado** | Rojo | Atenuado | Ninguno |

---

## 📊 IMPACTO EN CADA SECCIÓN

### **Vista: Agenda** 📅

**Filtro "Todos":**
- Muestra todos los pedidos incluidos los cancelados
- Los cancelados aparecen con estilo atenuado
- Sin botones de acción (solo visualización)

**Filtro "Pendientes":**
- Solo pedidos activos
- Oculta cancelados y entregados

**Filtro "Entregados":**
- Solo pedidos completados
- Oculta pendientes y cancelados

**Filtro "Cancelados":**
- Solo pedidos cancelados
- Útil para revisar historial

### **Vista: Finanzas** 💰

**Antes de cancelar:**
```
Total Ventas: 150.00 €
Cobrado:      100.00 €
Pendiente:     50.00 €
```

**Después de cancelar pedido de 30€:**
```
Total Ventas: 120.00 €  (↓ -30€)
Cobrado:      100.00 €
Pendiente:     20.00 €  (↓ -30€)
```

**Nota importante:** Si un pedido tenía un abono, ese dinero **no se resta automáticamente** del cobrado. Deberás gestionar la devolución por separado.

### **Impresión** 🖨️

**Agenda Activa:**
- Excluye pedidos cancelados
- Solo imprime pendientes y entregados

**Comandas Individuales:**
- No se puede imprimir comanda de pedido cancelado
- Botón de imprimir desaparece en cancelados

---

## 💡 CASOS DE USO COMUNES

### **Caso 1: Cliente Cancela Antes de Entregar**

```
Estado inicial: Pendiente
Adelanto: 20€ de 50€

1. Cancelar pedido
2. Devolver los 20€ al cliente (fuera del sistema)
3. El pedido queda marcado como Cancelado
4. Ya no aparece en finanzas ni impresiones
```

### **Caso 2: Error al Ingresar Datos**

```
Pedido creado con datos incorrectos

1. Cancelar el pedido erróneo
2. Crear un nuevo pedido con datos correctos
3. El cancelado queda en historial (por si acaso)
```

### **Caso 3: Cliente Cambia de Opinión Después de Entregar**

```
Estado: Entregado
Pago: Completo (50€)

1. Cancelar pedido (marca histórico)
2. Devolver dinero al cliente (fuera del sistema)
3. El pedido no contará en las finanzas del período
```

### **Caso 4: Cliente No Recoge el Pedido**

```
Estado: Pendiente
Fecha entrega: Pasada
Adelanto: 10€

Opción A - Cancelar:
  - Marca como cancelado
  - Cliente pierde el adelanto
  - Producto lo puedes vender a alguien más

Opción B - Conservar:
  - Lo dejas pendiente
  - Intentas contactar al cliente
  - Si recoge, marcas como entregado
```

---

## 🔍 FILTROS: GUÍA RÁPIDA

### **¿Cuándo usar cada filtro?**

**Filtro "Todos"** 📋
- Para ver el panorama completo
- Revisar historial completo
- Buscar un pedido específico

**Filtro "Pendientes"** ⏳
- Vista del día a día
- Ver qué falta preparar
- Gestión operativa diaria

**Filtro "Entregados"** ✅
- Revisar trabajo completado
- Ver qué se entregó en un período
- Seguimiento de clientes satisfechos

**Filtro "Cancelados"** ❌
- Analizar patrones de cancelación
- Revisar historial de problemas
- Auditoría y estadísticas

---

## ⚙️ DETALLES TÉCNICOS

### **En la Base de Datos (Supabase)**

```javascript
// El pedido NO se elimina, solo cambia de estado
UPDATE pasteleria 
SET estado = 'Cancelado'
WHERE id = 'pedido-123'

// El registro permanece en la DB con:
{
  id: "pedido-123",
  cliente: "Diana Gutierrez",
  producto: "Tarta",
  estado: "Cancelado",  // ← Cambió de "Pendiente"
  precio: 50,
  abono: 20,
  // ... resto de campos intactos
}
```

### **Ventajas de NO Eliminar**

1. ✅ **Historial completo** - Puedes ver qué se canceló
2. ✅ **Auditoría** - Rastrear todos los movimientos
3. ✅ **Estadísticas** - Analizar tasa de cancelación
4. ✅ **Reversible** - Técnicamente podrías "descancelar" (con código adicional)
5. ✅ **Protección** - No pierdes información por error

### **Queries de Finanzas**

```javascript
// Excluye cancelados automáticamente
resultado.data.forEach(pedido => {
    if (pedido.estado === 'Cancelado') return; // ← Salta este
    
    totalVendido += pedido.precio * pedido.cantidad;
    totalCobrado += pedido.abono;
});
```

---

## 🎨 ESTILO VISUAL

### **Badge de Cancelado**

```css
.badge-cancelado {
    background: var(--red-light);    /* Fondo rosa suave */
    color: var(--red-text);          /* Texto rojo */
    border: 1px solid var(--red-pastel); /* Borde rosa */
}
```

### **Card Atenuado**

```css
.pedido-card.cancelado {
    opacity: 0.6;                    /* Semitransparente */
    background: var(--red-light);    /* Fondo rosa */
    border-color: var(--red-pastel); /* Borde rosa */
}
```

---

## 📱 EXPERIENCIA MÓVIL

### **Modal de Confirmación**

```
┌─────────────────────────────┐
│  ⚠️ Cancelar Pedido         │
├─────────────────────────────┤
│                             │
│ ¿Estás seguro de que        │
│ quieres cancelar este       │
│ pedido?                     │
│                             │
│ Cliente: Diana Gutierrez    │
│ Producto: Tarta Chocolate   │
│                             │
│ El pedido se marcará como   │
│ cancelado y no se incluirá  │
│ en finanzas ni impresiones. │
│                             │
├──────────────┬──────────────┤
│ No, conservar│ Sí, cancelar │
└──────────────┴──────────────┘
```

### **Toast de Confirmación**

```
       ┌─────────────────────┐
       │ ❌ Pedido cancelado │
       └─────────────────────┘
              ↑
       Aparece 3 segundos
```

---

## 🚨 CONSIDERACIONES IMPORTANTES

### **Gestión de Dinero** 💵

⚠️ **IMPORTANTE:** El sistema **solo marca** el pedido como cancelado. **NO** hace:

- ❌ Devoluciones automáticas de dinero
- ❌ Ajustes de caja
- ❌ Notificaciones al cliente

**Tú debes:**
- ✅ Devolver el adelanto al cliente (si aplica)
- ✅ Informar al cliente de la cancelación
- ✅ Registrar la devolución en tu contabilidad

### **Clientes Frecuentes** 👥

- Los pedidos cancelados **NO** cuentan para clientes frecuentes
- Si un cliente tiene 5 pedidos y 2 cancelados, aparecerá con "3 pedidos"
- Esto mantiene limpias las sugerencias

### **Reportes y Estadísticas** 📊

**Tasa de Cancelación:**
```
Cancelados / Total de Pedidos = Tasa

Ejemplo:
2 cancelados / 20 pedidos = 10% tasa de cancelación
```

Si tu tasa es alta (>15%), considera:
- Mejorar comunicación con clientes
- Pedir más adelanto
- Confirmar pedidos 24h antes

---

## 🔄 FLUJO COMPLETO: DE PEDIDO A CANCELACIÓN

```
┌──────────────┐
│ Nuevo Pedido │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  Pendiente   │ ← Puede cancelarse
└──────┬───────┘
       │
       ├─→ ❌ CANCELAR → [Cancelado] (Final)
       │
       ↓
┌──────────────┐
│  Entregado   │ ← También puede cancelarse
└──────┬───────┘
       │
       └─→ ❌ CANCELAR → [Cancelado] (Final)
```

---

## 📋 CHECKLIST: ANTES DE CANCELAR

Antes de cancelar un pedido, verifica:

- [ ] ¿El cliente confirmó la cancelación?
- [ ] ¿Ya devolví el adelanto (si había)?
- [ ] ¿Anoté el motivo de cancelación en otro lado?
- [ ] ¿El producto se puede vender a alguien más?
- [ ] ¿Es realmente una cancelación o solo un cambio de fecha?

---

## 🎯 MEJORES PRÁCTICAS

### **Prevenir Cancelaciones**

1. **Confirma 24-48h antes** de la fecha de entrega
2. **Pide adelanto significativo** (30-50% mínimo)
3. **Comunica claramente** la política de cancelación
4. **Envía foto del producto** cuando esté listo

### **Gestionar Cancelaciones**

1. **Mantén la calma** - Es parte del negocio
2. **Sé profesional** - No tomes personal
3. **Documenta el motivo** - Aprende de patrones
4. **Política clara** - Define políticas de devolución

### **Políticas Sugeridas**

**Opción A - Estricta:**
- Adelanto 50%
- No reembolsable si cancela <48h antes
- Reembolso 50% si cancela >48h antes

**Opción B - Flexible:**
- Adelanto 30%
- Reembolso completo si cancela >72h antes
- Reembolso 50% si cancela 24-72h antes
- Sin reembolso <24h antes

**Opción C - Muy Flexible:**
- Adelanto 20%
- Reembolso completo siempre
- Basado en confianza y reputación

---

## 🔮 FUNCIONALIDADES FUTURAS SUGERIDAS

### **Próximas Mejoras Posibles:**

1. **Campo "Motivo de Cancelación"**
   ```
   Opciones:
   - Cliente canceló
   - No se pudo contactar
   - Error de pedido
   - Otro (especificar)
   ```

2. **Estadísticas de Cancelación**
   ```
   - Tasa de cancelación mensual
   - Clientes con más cancelaciones
   - Productos más cancelados
   - Motivos más comunes
   ```

3. **Botón "Descancelar"**
   ```
   Por si marcaste cancelado por error
   Solo disponible primeros 5 minutos
   ```

4. **Notificación Automática al Cliente**
   ```
   Enviar mensaje automático:
   "Tu pedido ha sido cancelado.
    Reembolso procesado."
   ```

5. **Registro de Devoluciones**
   ```
   Campo: "Dinero devuelto"
   Para tracking financiero completo
   ```

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Puedo "descancelar" un pedido?**
R: No actualmente. Deberás crear un nuevo pedido. En futuras versiones se podría añadir.

**P: ¿El dinero se devuelve automáticamente?**
R: No. Debes devolver el dinero manualmente y registrarlo fuera del sistema.

**P: ¿Los pedidos cancelados ocupan espacio en la base de datos?**
R: Sí, pero es mínimo y valioso para historial. Supabase tiene límites generosos.

**P: ¿Puedo eliminar permanentemente un pedido?**
R: No directamente en la interfaz (por seguridad). Tendrías que hacerlo desde Supabase directamente.

**P: ¿Los clientes pueden ver que su pedido fue cancelado?**
R: No. Este sistema es solo para tu gestión interna.

**P: ¿Afecta a las estadísticas de clientes frecuentes?**
R: Sí. Los pedidos cancelados NO cuentan para frecuencia.

**P: ¿Puedo filtrar pedidos cancelados por fecha?**
R: Sí, usa el filtro "Cancelados" + el filtro de fecha en Finanzas.

---

## 🎓 CONCLUSIÓN

El sistema de cancelación te permite:

✅ **Gestionar cambios** de forma profesional
✅ **Mantener historial** completo y preciso
✅ **Calcular finanzas** correctamente
✅ **Imprimir agendas** limpias (solo activas)
✅ **Analizar patrones** de cancelación
✅ **Proteger datos** sin eliminar información

**Recuerda:** Cancelar en el sistema es **solo el registro**. Tú debes gestionar la comunicación con el cliente y las devoluciones de dinero.

---

## 📞 SOPORTE TÉCNICO

Si encuentras algún problema:

1. Verifica la consola del navegador (F12)
2. Revisa los logs en la consola
3. Asegúrate de estar en HTTPS
4. Comprueba la conexión a Supabase

**Log esperado al cancelar:**
```
[2024-03-14T10:30:45Z] [INFO] Estado actualizado: Cancelado
```

¡Listo para gestionar tus pedidos profesionalmente! 🎉
