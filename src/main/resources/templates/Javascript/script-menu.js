document.addEventListener('DOMContentLoaded', () => {
    const viewMoreButtons = document.querySelectorAll('.btn-ver-mas');

    // Mapeo de descripciones extendidas por texto original de la descripción

    const extendedDescriptions = {
        "La base de muchas bebidas de café, un shot concentrado y lleno de sabor.": "Un espresso puro, preparado con granos de café seleccionados y tueste perfecto, ofreciendo un sabor intenso y un aroma inigualable. Ideal para los puristas del café.",
        "La combinación perfecta de espresso intenso y leche vaporizada con una capa suave de espuma.": "Nuestro Latte Cremoso es una obra de arte, con un equilibrio sublime entre el amargor del espresso y la dulzura sedosa de la leche vaporizada. Decorado con arte latte para una experiencia visual y gustativa.",
        "La indulgencia de chocolate, café espresso y leche cremosa, coronado con crema batida.": "El Mocha Chocolatoso es el placer definitivo para los amantes del chocolate y el café. Una rica mezcla de cacao premium, espresso y leche cremosa, finalizado con una generosa capa de crema batida y un toque de sirope de chocolate.",
        "Crujiente por fuera, suave por dentro, con un delicioso relleno y topping de almendras tostadas.": "Nuestro Croissant de Almendras se hornea diariamente hasta alcanzar la perfección dorada. Cada bocado revela un centro suave y una explosión de sabor a almendras, coronado con láminas tostadas y azúcar glas.",
        "Suave y esponjoso, horneado a la perfección con la dulzura natural de los arándanos frescos.": "Disfruta de la frescura en cada Mufin de Arándanos, preparado con arándanos jugosos que estallan en tu boca. Su textura esponjosa y su dulzura natural lo hacen el acompañamiento ideal para tu café.",
        "Cremosa y deliciosa tarta de queso sobre una base de galleta crujiente.": "La Tarta de Queso Clásica es un postre atemporal. Con una base de galleta crujiente y un relleno de queso cremoso y suave que se derrite en tu paladar. Un deleite simple pero sofisticado.",
        "Una deliciosa mezcla de café, leche y hielo, cubierta con crema batida.": "Nuestro Frapuccino es la bebida fría perfecta para cualquier momento. Una refrescante combinación de café helado, leche y tu sirope favorito, mezclado hasta la perfección y coronado con una abundante capa de crema batida.",
        "Un delicioso brownie de chocolate, rico y húmedo, perfecto para los amantes del chocolate.": "El Brownie de Chocolate es una explosión de sabor a cacao. Con su textura densa y húmeda, y trozos de chocolate derretido, es el sueño de todo chocoadicto, ideal para acompañar tu café o té.",
        "Clásico y satisfactorio, con pavo ahumado, queso suizo y vegetales frescos en pan artesanal.": "Nuestro Sándwich es la opción perfecta para un almuerzo ligero o un snack reconfortante. Preparado con pan artesanal fresco, finas lonchas de pavo ahumado, queso suizo fundido, lechuga crujiente y tomate fresco."
    };

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir comportamiento por defecto del botón
            
            const productoItem = event.target.closest('.producto-item');
            const productoDescripcion = productoItem.querySelector('p');
            const originalDescripcion = productoDescripcion.dataset.originalDescription || productoDescripcion.textContent;

            // Guarda la descripción original la primera vez
            if (!productoDescripcion.dataset.originalDescription) {
                productoDescripcion.dataset.originalDescription = originalDescripcion;
            }

            if (productoDescripcion.classList.contains('expanded')) {
                // Si está expandido, vuelve a la descripción original
                productoDescripcion.textContent = originalDescripcion;
                productoDescripcion.classList.remove('expanded');
                event.target.textContent = 'Ver más';
            } else {
                // Si no está expandido, muestra la descripción extendida
                productoDescripcion.textContent = extendedDescriptions[originalDescripcion] || originalDescripcion; // Usa la descripción extendida si existe, sino la original
                productoDescripcion.classList.add('expanded');
                event.target.textContent = 'Ver menos';
            }
        });
    });
});