// @ts-nocheck
document.addEventListener( 'DOMContentLoaded', ( e ) => {
    console.log( 'DOM fully loaded and parsed' )

    const menu = document.querySelector( '.menu' )
    const menuItem = document.querySelectorAll( '.menu__item' )
    const hamburger = document.querySelector( '.hamburger' )

    hamburger.addEventListener( 'click', () => {
        hamburger.classList.toggle( 'hamburger_active' )
        menu.classList.toggle( 'menu_active' )
    } )

    menuItem.forEach( item => {
        item.addEventListener( 'click', () => {
            hamburger.classList.toggle( 'hamburger_active' )
            menu.classList.toggle( 'menu_active' )
        } )
    } )

} )
