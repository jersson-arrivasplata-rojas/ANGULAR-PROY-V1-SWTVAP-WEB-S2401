import { sha256 } from 'js-sha256';
import { jwtDecode } from 'jwt-decode';

export class CommonUtils {
  public static price_max = 100000000000000;
  public static price_min = 0;
  public static filter_badge_count = 4;
  public static textWhatsapp = 'Hola Sumac Chasca Perú S.A.C.';
  public static phoneWhatsapp = '51900288628';
  public static randomPayment = () =>
    CommonUtils.getRandomMinToMax(100000, 999999);

  public static paymentFormCredentials = () => {
    let acq = 144;
    let idcomer = 12504;
    const purcha = CommonUtils.getRandomMinToMax(100000, 999999);
    let purchaamou = {
      basic: {
        amount: 1990,
        description: 'Plan Emprendedor Básico - S/19.90 x Mes',
      },
    };
    let purchaver = 'RCjKGcqWZHztDZhbuHU=362453532773';
    let purchacode = 604;
    console.log('purcha', purcha);

    let message =
      acq.toString() +
      idcomer.toString() +
      purcha.toString() +
      purchaamou.basic.amount.toString() +
      purchacode.toString() +
      purchaver.toString();
    console.log('message', message);

    let sha512 = null; //createHash("sha512").update(message).digest("hex");
    return {
      acq: acq,
      idcomer: idcomer,
      purcha: purcha, //CommonUtils.getRandomMinToMax(100000,999999)
      purchaamou: {
        basic: purchaamou.basic,
      },
      purchaver: purchaver,
      purchacode: purchacode,
      sha: sha512,
    };
  };

  public static hashString(input: string): string {
    return sha256(input);
  }
  public static sha = (
    acq,
    idcomer,
    purcha,
    purchaamou,
    purchacode,
    purchaver
  ) => {
    console.log('purcha', purcha);

    let message = acq + idcomer + purcha + purchaamou + purchacode + purchaver;
    console.log('message', message);

    let sha256 = null; // createHash("sha512").update(message).digest("hex");
    return sha256;
  };

  public static categories: {
    id: number;
    image: string;
    name: string;
    position: number;
  }[] = [
    { id: 1, image: 'Bodega.png', name: 'Bodega', position: 8 },
    {
      id: 2,
      image: 'Carnes-Pollos&Pescados.png',
      name: 'Carnes, Pollos y Pescados',
      position: 9,
    },
    {
      id: 4,
      image: 'Panaderia&Pasteleria.png',
      name: 'Panaderia y Pasteleria',
      position: 26,
    },
    { id: 25, image: 'Bebes&Ninos.png', name: 'Bebés', position: 7 },
    {
      id: 23,
      image: 'Libros&Revistas.png',
      name: 'Libros, Revistas y Comics',
      position: 24,
    },
    { id: 36, image: 'FastFood.png', name: 'Restaurante', position: 28 },
    { id: 40, image: 'Licores.png', name: 'Licores y Bebidas', position: 25 },
    { id: 10, image: 'Farmacia.png', name: 'Salud y Belleza', position: 30 },
    { id: 18, image: 'Mascotas.png', name: 'Animales y Mascotas', position: 3 },
    {
      id: 3,
      image: 'corte y confeccion.png',
      name: 'Corte y Confección',
      position: 14,
    },
    {
      id: 6,
      image: 'computadoras y accesorios.png',
      name: 'Computadora y Accesorios',
      position: 12,
    },
    {
      id: 7,
      image: 'electrodomesticos.png',
      name: 'Electrodomésticos',
      position: 16,
    },
    {
      id: 8,
      image: 'deportes y fitness.png',
      name: 'Deportes y Fitness',
      position: 15,
    },
    {
      id: 9,
      image: 'juegos y juguetes.png',
      name: 'Juegos y Juguetes',
      position: 23,
    },
    {
      id: 11,
      image: 'accesorios para vechiculos.png',
      name: 'Accesorios para Vehículos',
      position: 1,
    },
    {
      id: 12,
      image: 'telefonos y celulares.png',
      name: 'Celulares y Teléfonos',
      position: 10,
    },
    {
      id: 13,
      image: 'audio y video.png',
      name: 'Electrónica, Audio y Video',
      position: 17,
    },
    {
      id: 14,
      image: 'ropa y accesorios.png',
      name: 'Ropa y Accesorios',
      position: 29,
    },
    {
      id: 15,
      image: 'autos motos.png',
      name: 'Autos, Motos y Otros',
      position: 6,
    },
    {
      id: 16,
      image: 'joyas y relojes.png',
      name: 'Joyas y Relojes',
      position: 22,
    },
    {
      id: 17,
      image: 'consolas y videojuegos.png',
      name: 'Consolas y Videojuegos',
      position: 13,
    },
    {
      id: 19,
      image: 'antguedades y arte.png',
      name: 'Arte y Antiguedades',
      position: 4,
    },
    {
      id: 21,
      image: 'herramientas y construccion.png',
      name: 'Herramientas y Construcción',
      position: 18,
    },
    {
      id: 26,
      image: 'coleccionabes y hobbies.png',
      name: 'Coleccionables y Hobbies',
      position: 11,
    },
    {
      id: 27,
      image: 'industrias y oficinas.png',
      name: 'Industrias y Oficinas',
      position: 20,
    },
    {
      id: 28,
      image: 'instrumentos musicales.png',
      name: 'Instrumentos Musicales',
      position: 21,
    },
    { id: 29, image: 'agro.png', name: 'Agro', position: 2 },
    { id: 35, image: 'MAS_BLUE.svg', name: 'Otros', position: 33 },
    { id: 37, image: 'hilos y telas.png', name: 'Hilos y Telas', position: 19 },
    {
      id: 39,
      image: 'plasticos y descatables.png',
      name: 'Plasticos y Descartables',
      position: 27,
    },
    {
      id: 41,
      image: 'vidrios y pintura.png',
      name: 'Vidrios y Pintura',
      position: 32,
    },
    { id: 42, image: 'veterinaria.png', name: 'Veterinaria', position: 31 },
    { id: 43, image: 'artesanias.png', name: 'Artesanía', position: 5 },
  ];

  public static bootstrapFile: string[] = [
    'ads.scss',
    'alert.scss',
    'algolia.scss',
    'anchor.scss',
    'badge.scss',
    'brand.scss',
    'breadcrumb.scss',
    'browser-bugs.scss',
    'button-group.scss',
    'buttons.scss',
    'callouts.scss',
    'card.scss',
    'carousel.scss',
    'clipboard-js.scss',
    'close.scss',
    'code.scss',
    'colors.scss',
    'component-examples.scss',
    'content.scss',
    'custom-forms.scss',
    'dropdown.scss',
    'examples.scss',
    'featured-sites.scss',
    'footer.scss',
    'forms.scss',
    'functions.scss',
    'grid.scss',
    'images.scss',
    'input-group.scss',
    'jumbotron.scss',
    'list-group.scss',
    'masthead.scss',
    'media.scss',
    'mixins.scss',
    'modal.scss',
    'nav.scss',
    'navbar.scss',
    'page-header.scss',
    'pagination.scss',
    'popover.scss',
    'print.scss',
    'progress.scss',
    'reboot.scss',
    'responsive-tests.scss',
    'sidebar.scss',
    'skiplink.scss',
    'syntax.scss',
    'tables.scss',
    'team.scss',
    'tooltip.scss',
    'transitions.scss',
    'type.scss',
    'utilities.scss',
    'bootstrap-grid.scss',
    'bootstrap-reboot.scss',
    'bootstrap.scss',
    'mixins/alert.scss',
    'mixins/background-variant.scss',
    'mixins/badge.scss',
    'mixins/border-radius.scss',
    'mixins/box-shadow.scss',
    'mixins/breakpoints.scss',
    'mixins/buttons.scss',
    'mixins/clearfix.scss',
    'mixins/float.scss',
    'mixins/forms.scss',
    'mixins/gradients.scss',
    'mixins/grid-framework.scss',
    'mixins/grid.scss',
    'mixins/hover.scss',
    'mixins/image.scss',
    'mixins/list-group.scss',
    'mixins/lists.scss',
    'mixins/nav-divider.scss',
    'mixins/navbar-align.scss',
    'mixins/pagination.scss',
    'mixins/reset-text.scss',
    'mixins/resize.scss',
    'mixins/screen-reader.scss',
    'mixins/size.scss',
    'mixins/table-row.scss',
    'mixins/text-emphasis.scss',
    'mixins/text-hide.scss',
    'mixins/text-truncate.scss',
    'mixins/transition.scss',
    'mixins/visibility.scss',
    'utilities/align.scss',
    'utilities/background.scss',
    'utilities/borders.scss',
    'utilities/clearfix.scss',
    'utilities/display.scss',
    'utilities/embed.scss',
    'utilities/flex.scss',
    'utilities/float.scss',
    'utilities/position.scss',
    'utilities/screenreaders.scss',
    'utilities/sizing.scss',
    'utilities/spacing.scss',
    'utilities/text.scss',
    'utilities/visibility.scss',
    'docs.scss',
  ];

  public static cssToAdd = `
      $custom-checkbox-indicator-icon-checked: str-replace(
        url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#{$custom-control-indicator-checked-color}' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E"),
        '#',
        '%23'
        )
        !default;
      $custom-checkbox-indicator-icon-indeterminate: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='#{$custom-checkbox-indicator-indeterminate-color}' d='M0 2h4'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $custom-radio-indicator-icon-checked: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='#{$custom-control-indicator-checked-color}'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;

      $custom-select-indicator: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='#{$custom-select-indicator-color}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $navbar-dark-toggler-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-dark-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $navbar-light-toggler-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-light-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $carousel-control-prev-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $carousel-control-next-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
    `;

  public static fontKey: string[] = [
    'ABeeZee',
    'Abel',
    'Abhaya Libre',
    'Abril Fatface',
    'Aclonica',
    'Acme',
    'Actor',
    'Adamina',
    'Advent Pro',
    'Aguafina Script',
    'Akronim',
    'Aladin',
    'Aldrich',
    'Alef',
    'Alegreya',
    'Alegreya SC',
    'Alegreya Sans',
    'Alegreya Sans SC',
    'Alex Brush',
    'Alfa Slab One',
    'Alice',
    'Alike',
    'Alike Angular',
    'Allan',
    'Allerta',
    'Allerta Stencil',
    'Allura',
    'Almendra',
    'Almendra Display',
    'Almendra SC',
    'Amarante',
    'Amaranth',
    'Amatic SC',
    'Amethysta',
    'Amiko',
    'Amiri',
    'Amita',
    'Anaheim',
    'Andada',
    'Andika',
    'Angkor',
    'Annie Use Your Telescope',
    'Anonymous Pro',
    'Antic',
    'Antic Didone',
    'Antic Slab',
    'Anton',
    'Arapey',
    'Arbutus',
    'Arbutus Slab',
    'Architects Daughter',
    'Archivo',
    'Archivo Black',
    'Archivo Narrow',
    'Aref Ruqaa',
    'Arima Madurai',
    'Arimo',
    'Arizonia',
    'Armata',
    'Arsenal',
    'Artifika',
    'Arvo',
    'Arya',
    'Asap',
    'Asap Condensed',
    'Asar',
    'Asset',
    'Assistant',
    'Astloch',
    'Asul',
    'Athiti',
    'Atma',
    'Atomic Age',
    'Aubrey',
    'Audiowide',
    'Autour One',
    'Average',
    'Average Sans',
    'Averia Gruesa Libre',
    'Averia Libre',
    'Averia Sans Libre',
    'Averia Serif Libre',
    'Bad Script',
    'Bahiana',
    'Baloo',
    'Baloo Bhai',
    'Baloo Bhaijaan',
    'Baloo Bhaina',
    'Baloo Chettan',
    'Baloo Da',
    'Baloo Paaji',
    'Baloo Tamma',
    'Baloo Tammudu',
    'Baloo Thambi',
    'Balthazar',
    'Bangers',
    'Barrio',
    'Basic',
    'Battambang',
    'Baumans',
    'Bayon',
    'Belgrano',
    'Bellefair',
    'Belleza',
    'BenchNine',
    'Bentham',
    'Berkshire Swash',
    'Bevan',
    'Bigelow Rules',
    'Bigshot One',
    'Bilbo',
    'Bilbo Swash Caps',
    'BioRhyme',
    'BioRhyme Expanded',
    'Biryani',
    'Bitter',
    'Black Ops One',
    'Bokor',
    'Bonbon',
    'Boogaloo',
    'Bowlby One',
    'Bowlby One SC',
    'Brawler',
    'Bree Serif',
    'Bubblegum Sans',
    'Bubbler One',
    'Buda',
    'Buenard',
    'Bungee',
    'Bungee Hairline',
    'Bungee Inline',
    'Bungee Outline',
    'Bungee Shade',
    'Butcherman',
    'Butterfly Kids',
    'Cabin',
    'Cabin Condensed',
    'Cabin Sketch',
    'Caesar Dressing',
    'Cagliostro',
    'Cairo',
    'Calligraffitti',
    'Cambay',
    'Cambo',
    'Candal',
    'Cantarell',
    'Cantata One',
    'Cantora One',
    'Capriola',
    'Cardo',
    'Carme',
    'Carrois Gothic',
    'Carrois Gothic SC',
    'Carter One',
    'Catamaran',
    'Caudex',
    'Caveat',
    'Caveat Brush',
    'Cedarville Cursive',
    'Ceviche One',
    'Changa',
    'Changa One',
    'Chango',
    'Chathura',
    'Chau Philomene One',
    'Chela One',
    'Chelsea Market',
    'Chenla',
    'Cherry Cream Soda',
    'Cherry Swash',
    'Chewy',
    'Chicle',
    'Chivo',
    'Chonburi',
    'Cinzel',
    'Cinzel Decorative',
    'Clicker Script',
    'Coda',
    'Coda Caption',
    'Codystar',
    'Coiny',
    'Combo',
    'Comfortaa',
    'Coming Soon',
    'Concert One',
    'Condiment',
    'Content',
    'Contrail One',
    'Convergence',
    'Cookie',
    'Copse',
    'Corben',
    'Cormorant',
    'Cormorant Garamond',
    'Cormorant Infant',
    'Cormorant SC',
    'Cormorant Unicase',
    'Cormorant Upright',
    'Courgette',
    'Cousine',
    'Coustard',
    'Covered By Your Grace',
    'Crafty Girls',
    'Creepster',
    'Crete Round',
    'Crimson Text',
    'Croissant One',
    'Crushed',
    'Cuprum',
    'Cutive',
    'Cutive Mono',
    'Damion',
    'Dancing Script',
    'Dangrek',
    'David Libre',
    'Dawning of a New Day',
    'Days One',
    'Dekko',
    'Delius',
    'Delius Swash Caps',
    'Delius Unicase',
    'Della Respira',
    'Denk One',
    'Devonshire',
    'Dhurjati',
    'Didact Gothic',
    'Diplomata',
    'Diplomata SC',
    'Domine',
    'Donegal One',
    'Doppio One',
    'Dorsa',
    'Dosis',
    'Dr Sugiyama',
    'Droid Sans',
    'Droid Sans Mono',
    'Droid Serif',
    'Duru Sans',
    'Dynalight',
    'EB Garamond',
    'Eagle Lake',
    'Eater',
    'Economica',
    'Eczar',
    'El Messiri',
    'Electrolize',
    'Elsie',
    'Elsie Swash Caps',
    'Emblema One',
    'Emilys Candy',
    'Encode Sans',
    'Encode Sans Condensed',
    'Encode Sans Expanded',
    'Encode Sans Semi Condensed',
    'Encode Sans Semi Expanded',
    'Engagement',
    'Englebert',
    'Enriqueta',
    'Erica One',
    'Esteban',
    'Euphoria Script',
    'Ewert',
    'Exo',
    'Exo 2',
    'Expletus Sans',
    'Fanwood Text',
    'Farsan',
    'Fascinate',
    'Fascinate Inline',
    'Faster One',
    'Fasthand',
    'Fauna One',
    'Faustina',
    'Federant',
    'Federo',
    'Felipa',
    'Fenix',
    'Finger Paint',
    'Fira Mono',
    'Fira Sans',
    'Fira Sans Condensed',
    'Fira Sans Extra Condensed',
    'Fjalla One',
    'Fjord One',
    'Flamenco',
    'Flavors',
    'Fondamento',
    'Fontdiner Swanky',
    'Forum',
    'Francois One',
    'Frank Ruhl Libre',
    'Freckle Face',
    'Fredericka the Great',
    'Fredoka One',
    'Freehand',
    'Fresca',
    'Frijole',
    'Fruktur',
    'Fugaz One',
    'GFS Didot',
    'GFS Neohellenic',
    'Gabriela',
    'Gafata',
    'Galada',
    'Galdeano',
    'Galindo',
    'Gentium Basic',
    'Gentium Book Basic',
    'Geo',
    'Geostar',
    'Geostar Fill',
    'Germania One',
    'Gidugu',
    'Gilda Display',
    'Give You Glory',
    'Glass Antiqua',
    'Glegoo',
    'Gloria Hallelujah',
    'Goblin One',
    'Gochi Hand',
    'Gorditas',
    'Goudy Bookletter 1911',
    'Graduate',
    'Grand Hotel',
    'Gravitas One',
    'Great Vibes',
    'Griffy',
    'Gruppo',
    'Gudea',
    'Gurajada',
    'Habibi',
    'Halant',
    'Hammersmith One',
    'Hanalei',
    'Hanalei Fill',
    'Handlee',
    'Hanuman',
    'Happy Monkey',
    'Harmattan',
    'Headland One',
    'Heebo',
    'Henny Penny',
    'Herr Von Muellerhoff',
    'Hind',
    'Hind Guntur',
    'Hind Madurai',
    'Hind Siliguri',
    'Hind Vadodara',
    'Holtwood One SC',
    'Homemade Apple',
    'Homenaje',
    'IM Fell DW Pica',
    'IM Fell DW Pica SC',
    'IM Fell Double Pica',
    'IM Fell Double Pica SC',
    'IM Fell English',
    'IM Fell English SC',
    'IM Fell French Canon',
    'IM Fell French Canon SC',
    'IM Fell Great Primer',
    'IM Fell Great Primer SC',
    'Iceberg',
    'Iceland',
    'Imprima',
    'Inconsolata',
    'Inder',
    'Indie Flower',
    'Inika',
    'Inknut Antiqua',
    'Irish Grover',
    'Istok Web',
    'Italiana',
    'Italianno',
    'Itim',
    'Jacques Francois',
    'Jacques Francois Shadow',
    'Jaldi',
    'Jim Nightshade',
    'Jockey One',
    'Jolly Lodger',
    'Jomhuria',
    'Josefin Sans',
    'Josefin Slab',
    'Joti One',
    'Judson',
    'Julee',
    'Julius Sans One',
    'Junge',
    'Jura',
    'Just Another Hand',
    'Just Me Again Down Here',
    'Kadwa',
    'Kalam',
    'Kameron',
    'Kanit',
    'Kantumruy',
    'Karla',
    'Karma',
    'Katibeh',
    'Kaushan Script',
    'Kavivanar',
    'Kavoon',
    'Kdam Thmor',
    'Keania One',
    'Kelly Slab',
    'Kenia',
    'Khand',
    'Khmer',
    'Khula',
    'Kite One',
    'Knewave',
    'Kotta One',
    'Koulen',
    'Kranky',
    'Kreon',
    'Kristi',
    'Krona One',
    'Kumar One',
    'Kumar One Outline',
    'Kurale',
    'La Belle Aurore',
    'Laila',
    'Lakki Reddy',
    'Lalezar',
    'Lancelot',
    'Lateef',
    'Lato',
    'League Script',
    'Leckerli One',
    'Ledger',
    'Lekton',
    'Lemon',
    'Lemonada',
    'Libre Barcode 128',
    'Libre Barcode 128 Text',
    'Libre Barcode 39',
    'Libre Barcode 39 Extended',
    'Libre Barcode 39 Extended Text',
    'Libre Barcode 39 Text',
    'Libre Baskerville',
    'Libre Franklin',
    'Life Savers',
    'Lilita One',
    'Lily Script One',
    'Limelight',
    'Linden Hill',
    'Lobster',
    'Lobster Two',
    'Londrina Outline',
    'Londrina Shadow',
    'Londrina Sketch',
    'Londrina Solid',
    'Lora',
    'Love Ya Like A Sister',
    'Loved by the King',
    'Lovers Quarrel',
    'Luckiest Guy',
    'Lusitana',
    'Lustria',
    'Macondo',
    'Macondo Swash Caps',
    'Mada',
    'Magra',
    'Maiden Orange',
    'Maitree',
    'Mako',
    'Mallanna',
    'Mandali',
    'Manuale',
    'Marcellus',
    'Marcellus SC',
    'Marck Script',
    'Margarine',
    'Marko One',
    'Marmelad',
    'Martel',
    'Martel Sans',
    'Marvel',
    'Mate',
    'Mate SC',
    'Maven Pro',
    'McLaren',
    'Meddon',
    'MedievalSharp',
    'Medula One',
    'Meera Inimai',
    'Megrim',
    'Meie Script',
    'Merienda',
    'Merienda One',
    'Merriweather',
    'Merriweather Sans',
    'Metal',
    'Metal Mania',
    'Metamorphous',
    'Metrophobic',
    'Michroma',
    'Milonga',
    'Miltonian',
    'Miltonian Tattoo',
    'Miniver',
    'Miriam Libre',
    'Mirza',
    'Miss Fajardose',
    'Mitr',
    'Modak',
    'Modern Antiqua',
    'Mogra',
    'Molengo',
    'Molle',
    'Monda',
    'Monofett',
    'Monoton',
    'Monsieur La Doulaise',
    'Montaga',
    'Montez',
    'Montserrat',
    'Montserrat Alternates',
    'Montserrat Subrayada',
    'Moul',
    'Moulpali',
    'Mountains of Christmas',
    'Mouse Memoirs',
    'Mr Bedfort',
    'Mr Dafoe',
    'Mr De Haviland',
    'Mrs Saint Delafield',
    'Mrs Sheppards',
    'Mukta',
    'Mukta Mahee',
    'Mukta Malar',
    'Mukta Vaani',
    'Muli',
    'Mystery Quest',
    'NTR',
    'Neucha',
    'Neuton',
    'New Rocker',
    'News Cycle',
    'Niconne',
    'Nixie One',
    'Nobile',
    'Nokora',
    'Norican',
    'Nosifer',
    'Nothing You Could Do',
    'Noticia Text',
    'Noto Sans',
    'Noto Serif',
    'Nova Cut',
    'Nova Flat',
    'Nova Mono',
    'Nova Oval',
    'Nova Round',
    'Nova Script',
    'Nova Slim',
    'Nova Square',
    'Numans',
    'Nunito',
    'Nunito Sans',
    'Odor Mean Chey',
    'Offside',
    'Old Standard TT',
    'Oldenburg',
    'Oleo Script',
    'Oleo Script Swash Caps',
    'Open Sans',
    'Open Sans Condensed',
    'Oranienbaum',
    'Orbitron',
    'Oregano',
    'Orienta',
    'Original Surfer',
    'Oswald',
    'Over the Rainbow',
    'Overlock',
    'Overlock SC',
    'Overpass',
    'Overpass Mono',
    'Ovo',
    'Oxygen',
    'Oxygen Mono',
    'PT Mono',
    'PT Sans',
    'PT Sans Caption',
    'PT Sans Narrow',
    'PT Serif',
    'PT Serif Caption',
    'Pacifico',
    'Padauk',
    'Palanquin',
    'Palanquin Dark',
    'Pangolin',
    'Paprika',
    'Parisienne',
    'Passero One',
    'Passion One',
    'Pathway Gothic One',
    'Patrick Hand',
    'Patrick Hand SC',
    'Pattaya',
    'Patua One',
    'Pavanam',
    'Paytone One',
    'Peddana',
    'Peralta',
    'Permanent Marker',
    'Petit Formal Script',
    'Petrona',
    'Philosopher',
    'Piedra',
    'Pinyon Script',
    'Pirata One',
    'Plaster',
    'Play',
    'Playball',
    'Playfair Display',
    'Playfair Display SC',
    'Podkova',
    'Poiret One',
    'Poller One',
    'Poly',
    'Pompiere',
    'Pontano Sans',
    'Poppins',
    'Port Lligat Sans',
    'Port Lligat Slab',
    'Pragati Narrow',
    'Prata',
    'Preahvihear',
    'Press Start 2P',
    'Pridi',
    'Princess Sofia',
    'Prociono',
    'Prompt',
    'Prosto One',
    'Proza Libre',
    'Puritan',
    'Purple Purse',
    'Quando',
    'Quantico',
    'Quattrocento',
    'Quattrocento Sans',
    'Questrial',
    'Quicksand',
    'Quintessential',
    'Qwigley',
    'Racing Sans One',
    'Radley',
    'Rajdhani',
    'Rakkas',
    'Raleway',
    'Raleway Dots',
    'Ramabhadra',
    'Ramaraja',
    'Rambla',
    'Rammetto One',
    'Ranchers',
    'Rancho',
    'Ranga',
    'Rasa',
    'Rationale',
    'Ravi Prakash',
    'Redressed',
    'Reem Kufi',
    'Reenie Beanie',
    'Revalia',
    'Rhodium Libre',
    'Ribeye',
    'Ribeye Marrow',
    'Righteous',
    'Risque',
    'Roboto',
    'Roboto Condensed',
    'Roboto Mono',
    'Roboto Slab',
    'Rochester',
    'Rock Salt',
    'Rokkitt',
    'Romanesco',
    'Ropa Sans',
    'Rosario',
    'Rosarivo',
    'Rouge Script',
    'Rozha One',
    'Rubik',
    'Rubik Mono One',
    'Ruda',
    'Rufina',
    'Ruge Boogie',
    'Ruluko',
    'Rum Raisin',
    'Ruslan Display',
    'Russo One',
    'Ruthie',
    'Rye',
    'Sacramento',
    'Sahitya',
    'Sail',
    'Saira',
    'Saira Condensed',
    'Saira Extra Condensed',
    'Saira Semi Condensed',
    'Salsa',
    'Sanchez',
    'Sancreek',
    'Sansita',
    'Sarala',
    'Sarina',
    'Sarpanch',
    'Satisfy',
    'Scada',
    'Scheherazade',
    'Schoolbell',
    'Scope One',
    'Seaweed Script',
    'Secular One',
    'Sedgwick Ave',
    'Sedgwick Ave Display',
    'Sevillana',
    'Seymour One',
    'Shadows Into Light',
    'Shadows Into Light Two',
    'Shanti',
    'Share',
    'Share Tech',
    'Share Tech Mono',
    'Shojumaru',
    'Short Stack',
    'Shrikhand',
    'Siemreap',
    'Sigmar One',
    'Signika',
    'Signika Negative',
    'Simonetta',
    'Sintony',
    'Sirin Stencil',
    'Six Caps',
    'Skranji',
    'Slabo 13px',
    'Slabo 27px',
    'Slackey',
    'Smokum',
    'Smythe',
    'Sniglet',
    'Snippet',
    'Snowburst One',
    'Sofadi One',
    'Sofia',
    'Sonsie One',
    'Sorts Mill Goudy',
    'Source Code Pro',
    'Source Sans Pro',
    'Source Serif Pro',
    'Space Mono',
    'Special Elite',
    'Spectral',
    'Spicy Rice',
    'Spinnaker',
    'Spirax',
    'Squada One',
    'Sree Krushnadevaraya',
    'Sriracha',
    'Stalemate',
    'Stalinist One',
    'Stardos Stencil',
    'Stint Ultra Condensed',
    'Stint Ultra Expanded',
    'Stoke',
    'Strait',
    'Sue Ellen Francisco',
    'Suez One',
    'Sumana',
    'Sunshiney',
    'Supermercado One',
    'Sura',
    'Suranna',
    'Suravaram',
    'Suwannaphum',
    'Swanky and Moo Moo',
    'Syncopate',
    'Tangerine',
    'Taprom',
    'Tauri',
    'Taviraj',
    'Teko',
    'Telex',
    'Tenali Ramakrishna',
    'Tenor Sans',
    'Text Me One',
    'The Girl Next Door',
    'Tienne',
    'Tillana',
    'Timmana',
    'Tinos',
    'Titan One',
    'Titillium Web',
    'Trade Winds',
    'Trirong',
    'Trocchi',
    'Trochut',
    'Trykker',
    'Tulpen One',
    'Ubuntu',
    'Ubuntu Condensed',
    'Ubuntu Mono',
    'Ultra',
    'Uncial Antiqua',
    'Underdog',
    'Unica One',
    'UnifrakturCook',
    'UnifrakturMaguntia',
    'Unkempt',
    'Unlock',
    'Unna',
    'VT323',
    'Vampiro One',
    'Varela',
    'Varela Round',
    'Vast Shadow',
    'Vesper Libre',
    'Vibur',
    'Vidaloka',
    'Viga',
    'Voces',
    'Volkhov',
    'Vollkorn',
    'Voltaire',
    'Waiting for the Sunrise',
    'Wallpoet',
    'Walter Turncoat',
    'Warnes',
    'Wellfleet',
    'Wendy One',
    'Wire One',
    'Work Sans',
    'Yanone Kaffeesatz',
    'Yantramanav',
    'Yatra One',
    'Yellowtail',
    'Yeseva One',
    'Yesteryear',
    'Yrsa',
    'Zeyada',
    'Zilla Slab',
    'Zilla Slab Highlight',
  ];

  public static sassFunctionKey: string[] = [
    'rgb($red, $green, $blue)',
    'rgba($red, $green, $blue, $alpha)',
    'red($color)',
    'green($color)',
    'blue($color)',
    'mix($color1, $color2, [$weight])',
    'hsl($hue, $saturation, $lightness)',
    'hsla($hue, $saturation, $lightness, $alpha)',
    'hue($color)',
    'saturation($color)',
    'lightness($color)',
    'adjust-hue($color, $degrees)',
    'lighten($color, $amount)',
    'darken($color, $amount)',
    'saturate($color, $amount)',
    'desaturate($color, $amount)',
    'grayscale($color)',
    'complement($color)',
    'invert($color, [$weight])',
    'alpha($color) / opacity($color)',
    'rgba($color, $alpha)',
    'opacify($color, $amount) / fade-in($color, $amount)',
    'transparentize($color, $amount) / fade-out($color, $amount)',
    'adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])',
    'scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])',
    'change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])',
    'ie-hex-str($color)',
    'unquote($string)',
    'quote($string)',
    'str-length($string)',
    'str-insert($string, $insert, $index)',
    'str-index($string, $substring)',
    'str-slice($string, $start-at, [$end-at])',
    'to-upper-case($string)',
    'to-lower-case($string)',
    'percentage($number)',
    'round($number)',
    'ceil($number)',
    'floor($number)',
    'abs($number)',
    'min($numbers...)',
    'max($numbers...)',
    'random([$limit])',
    'length($list)',
    'nth($list, $n)',
    'set-nth($list, $n, $value)',
    'join($list1, $list2, [$separator, $bracketed])',
    'append($list1, $val, [$separator])',
    'zip($lists...)',
    'index($list, $value)',
    'list-separator($list)',
    'is-bracketed($list)',
    'map-get($map, $key)',
    'map-merge($map1, $map2)',
    'map-remove($map, $keys...)',
    'map-keys($map)',
    'map-values($map)',
    'map-has-key($map, $key)',
    'keywords($args)',
    'selector-nest($selectors...)',
    'selector-append($selectors...)',
    'selector-extend($selector, $extendee, $extender)',
    'selector-replace($selector, $original, $replacement)',
    'selector-unify($selector1, $selector2)',
    'is-superselector($super, $sub)',
    'simple-selectors($selector)',
    'selector-parse($selector)',
    'feature-exists($feature)',
    'variable-exists($name)',
    'global-variable-exists($name)',
    'function-exists($name)',
    'mixin-exists($name)',
    'content-exists()',
    'inspect($value)',
    'type-of($value)',
    'unit($number)',
    'unitless($number)',
    'comparable($number1, $number2)',
    'call($function, $args...)',
    'get-function($name, $css',
    'if($condition, $if-true, $if-false)',
    'unique-id()',
  ];

  public static getPortalId(): number {
    return parseInt(localStorage.getItem('portalId'));
  }

  public static resizeScrollDashboard() {
    document
      .querySelectorAll('.main-content')[0]
      .setAttribute('style', `height: ${window.innerHeight - 70}px`);
    document
      .querySelectorAll('.height-dashboard')[0]
      .setAttribute('style', `height: ${window.innerHeight - 140}px`);

    window.onresize = () => {
      document
        .querySelectorAll('.main-content')[0]
        .setAttribute('style', `height: ${window.innerHeight - 70}px`);
      document
        .querySelectorAll('.height-dashboard')[0]
        .setAttribute('style', `height: ${window.innerHeight - 140}px`);
    };
  }
  public static resizeGoogleMaps() {
    document
      .querySelectorAll('.google-map')[0]
      .setAttribute('style', `height: ${window.innerHeight - 104}px`); //200 116
    document
      .querySelectorAll('.main-content')[0]
      .setAttribute('style', `height: ${window.innerHeight - 4}px`);
    document
      .querySelectorAll('.height-dashboard')[0]
      .setAttribute('style', `height: ${window.innerHeight - 80}px`);

    window.onresize = () => {
      document
        .querySelectorAll('.google-map')[0]
        .setAttribute('style', `height: ${window.innerHeight - 104}px`);
      document
        .querySelectorAll('.main-content')[0]
        .setAttribute('style', `height: ${window.innerHeight - 4}px`);
      document
        .querySelectorAll('.height-dashboard')[0]
        .setAttribute('style', `height: ${window.innerHeight - 80}px`);
    };
  }

  public static getToken(token: string): string {
    return localStorage.getItem(token);
  }
  public static removeNodoPreloadHidden(id: string) {
    var preload: HTMLElement = document.getElementById(id);
    preload.innerHTML = '';
    preload.setAttribute('hidden', 'true');
  }
  public static removeNodoPreloadHtml(id: string) {
    var preload: HTMLElement = document.getElementById(id);
    preload.innerHTML = '';
    // preload.setAttribute('hidden','true');
  }
  public static insertBodyTopFacebook(facebook_button: string) {
    //var MESSENGER: HTMLElement = document.getElementById('MESSENGER');

    var divHtmlObject: HTMLElement = document.createElement('div');
    divHtmlObject.setAttribute('class', 'fb-customerchat');
    divHtmlObject.setAttribute('setup_tool', 'setup_tool');
    divHtmlObject.setAttribute('page_id', facebook_button);

    var htmlBody = document.body;
    htmlBody.insertAdjacentElement('afterbegin', divHtmlObject);
  }
  public static insertBodyTop(
    facebook_button: string,
    theme_color_primary: string
  ) {
    //var MESSENGER: HTMLElement = document.getElementById('MESSENGER');

    var divHtmlObject: HTMLElement = document.createElement('div');
    divHtmlObject.setAttribute('class', 'fb-customerchat');
    divHtmlObject.setAttribute('setup_tool', 'setup_tool');
    divHtmlObject.setAttribute('page_id', facebook_button);
    divHtmlObject.setAttribute('theme_color', theme_color_primary);

    var htmlBody = document.body;
    htmlBody.insertAdjacentElement('afterbegin', divHtmlObject);
  }

  public static insertPreloadStoreRemoveHidden(
    id: string,
    img: string,
    name: string
  ) {
    var preload: HTMLElement = document.getElementById(id);
    preload.removeAttribute('hidden');

    var htmlString = `
        <!--loadscreen-->
        <div class="loading d-flex flex-column">
          <!--spinner-bubble spinner-bubble-primary    -->
          <div class="img-store preload-message-active" style="background-image:url(${img})"></div>
          <p class="mb-0 mt-2" style="font-weight: bold;color: white;">Cargando ...</p>
        </div>
      `;
    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('class', 'h-100 preloader');

    htmlObject.innerHTML = htmlString;

    preload.insertAdjacentElement('afterbegin', htmlObject);
  }
  public static insertPreloadRemoveHidden(id: string) {
    var preload: HTMLElement = document.getElementById(id);
    preload.removeAttribute('hidden');

    var htmlString = `
        <!--loadscreen-->
        <div class="loading ">
          <!--spinner-bubble spinner-bubble-primary    -->
          <div class="img preload-message-active"></div>
        </div>
      `;
    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('class', 'h-100 preloader');

    htmlObject.innerHTML = htmlString;

    preload.insertAdjacentElement('afterbegin', htmlObject);
  }

  public static insertPreload(id: string) {
    var preload: any = document.getElementById(id);
    preload.removeAttribute('hidden');

    var htmlString = `
        <!--loadscreen-->
        <div class="loading ">
          <!--spinner-bubble spinner-bubble-primary    -->
          <div class="img preload-message-active"></div>
        </div>
      `;
    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('class', 'h-100 preloader');

    htmlObject.innerHTML = htmlString;

    preload.insertAdjacentElement('afterbegin', htmlObject);
  }

  public static removeNodoPreload(
    id: string,
    img: string,
    message: string,
    alertColor: string,
    reload: boolean
  ) {
    var preload: any = document.getElementById(id);
    preload.innerHTML = '';

    var htmlString = `
      <!--loadscreen-->
        <div class="loading ">
              <!--spinner-bubble spinner-bubble-primary    -->
              <div class="preload-alert" >
                  <div class="row">
                      <div action="#" class="col-12 ">
                          <div class="row mb-5">
                              <div class="col-lg-12">
                                  <div class="alert alert-${alertColor}  border-input h-100 w-100" style="    padding: 0;" >
                                      <div class="row ">
                                          <div class="col-12 links text-center">
                                              <img class="logo-img mb-3" src="${img}">
                                          </div>
                                      </div>
                                      <h2 class="col-12 text-center">${message}</h2>
                                      <p class="col-12 text-center mt-2">Gracias por confiar en Sumac Chasca Perú S.A.C.</p>
                                      ${
                                        reload == false
                                          ? `
                                        <div class="row mt-5">
                                            <div class="col-12 links text-center">
                                                <div>
                                                    <a href="javascript:void(0);" class="font-size-link" (click)="login($event)" style="text-decoration: underline;">Ir a Iniciar sesión</a>
                                                </div>
                                            </div>
                                            <div class="col-12 links  mt-3 text-center">
                                                <div>
                                                    <a href="javascript:void(0);" class="font-size-link" onclick="window.location.reload()" style="text-decoration: underline;">¡Crear nuevo usuario!</a>
                                                </div>
                                            </div>
                                        </div>
                                      `
                                          : ''
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      `;

    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('class', 'h-100 preloader');

    htmlObject.innerHTML = htmlString;

    preload.insertAdjacentElement('afterbegin', htmlObject);

    if (reload == true) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  public static removeNodoHomePreload(
    id: string,
    img: string,
    message: string,
    alertColor: string
  ) {
    var preload: any = document.getElementById(id);
    preload.innerHTML = '';

    var htmlString = `
      <!--loadscreen-->
        <div class="loading ">
              <!--spinner-bubble spinner-bubble-primary    -->
              <div class="preload-alert" >
                  <div class="row">
                      <div action="#" class="col-12 ">
                          <div class="row mb-5">
                              <div class="col-lg-12">
                                  <div class="alert alert-${alertColor}  border-input h-100 w-100" style="padding: inherit!important;">
                                      <div class="row ">
                                          <div class="col-12 links text-center">
                                              <img class="logo-img mb-3" src="${img}">
                                          </div>
                                      </div>
                                      <h2 class="col-12 text-center">${message}</h2>
                                      <p class="col-12 text-center mt-2">Gracias por confiar en Sumac Chasca Perú S.A.C.</p>
                                      <p class="col-12 text-center mt-2">Esperando mientras redirige al home</p>
                                      <div class="row mt-5">
                                        <div class="col-12 links text-center">
                                            <div>
                                                <a href="javascript:void(0);" class="font-size-link" (click)="home($event)" style="text-decoration: underline;">Ir al Home</a>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      `;

    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('class', 'h-100 preloader');

    htmlObject.innerHTML = htmlString;

    preload.insertAdjacentElement('afterbegin', htmlObject);
  }

  public static activatePreload(time: number) {
    if (
      window.document.querySelector('#preloader').classList.contains('d-none')
    ) {
      window.document.querySelector('#preloader').classList.remove('d-none');
    }
    setTimeout(() => {
      window.document.querySelector('#preloader').classList.add('d-none');
    }, time);
  }
  public static removePreload(time: number) {
    setTimeout(() => {
      if (
        !window.document
          .querySelector('#preloader')
          .classList.contains('d-none')
      ) {
        window.document.querySelector('#preloader').classList.add('d-none');
      }
    }, time);
  }
  public static removeEtiquetasLoading() {
    if (
      window.document.querySelector('.loading-ios').classList.contains('d-none')
    ) {
      window.document.querySelector('.loading-ios').classList.remove('d-none');
    }
  }
  public static addStyleBody(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(`${css}`));
    document.body.appendChild(style);
  }

  public static scrollToTop() {
    setTimeout(() => {
      const classes: HTMLCollectionOf<Element> =
        document.getElementsByClassName('CONTENT');
      for (let index = 0; index < classes.length; index++) {
        const element = classes[index];
        element.scrollTop = 0;
      }
    }, 500);
  }

  public static hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16),
        }
      : null;
  }

  public static hexToRgbT(hex) {
    let r = Number('0x' + hex.substr(1, 2));
    let g = Number('0x' + hex.substr(3, 2));
    let b = Number('0x' + hex.substr(5, 2));

    let rgb = [r, g, b];
    let rgbString = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    return { array: rgb, string: rgbString };
  }
  //hsl -> hue - saturation - lightness
  //https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/
  public static rgbToHsl(rgb) {
    let h, s, l;
    // The formula used for hue depends on which color
    // channel (r, g, or b) has the highest value
    let strongestChannel = 0;

    // Normalize the rgb values to between 0 - 1
    let normalizedRgb = rgb.array.map(function (n) {
      return n / 255;
    });
    // Store them as individual variables for convenience
    let [r, g, b] = normalizedRgb;
    // Compute the min and max channel values. These are used to determine
    // all 3 hsl values.
    let minVal = normalizedRgb.reduce(function (t, v) {
      return Math.min(t, v);
    });
    // Get the max value, but also note which channel (index) is strongest
    let maxVal = normalizedRgb.reduce(function (t, v, i) {
      if (v > t) {
        strongestChannel = i;
        return v;
      } else {
        return t;
      }
    });

    // Lightness is a very straightforward calculation
    l = (minVal + maxVal) / 2;

    // Only calculate saturation if there is a difference
    // in color values. There are 2 formulas used, depending
    // on whether lightness is above or below 50. Note that
    // saturation peaks when lightness is at 50, and declines
    // in both directions
    if (maxVal != minVal) {
      if (l > 50) {
        s = (maxVal - minVal) / (2 - maxVal - minVal);
      } else {
        s = (maxVal - minVal) / (maxVal + minVal);
      }

      // calculate hue using one of 3 formulas (based on strongest channel)
      switch (strongestChannel) {
        case 0:
          h = (g - b) / (maxVal - minVal);
          break;
        case 1:
          h = 2 + (b - r) / (maxVal - minVal);
          break;
        case 2:
          h = 4 + (r - g) / (maxVal - minVal);
      }
      // multiply hue by 60 to get the degree
      h = h * 60;
      // add 360 to negative values, effectively
      // causing them to loop around the circle and
      // maintaining a value range of between 0 - 360
      if (h < 0) {
        h += 360;
      }
    } else {
      s = 0;
      h = 0;
    }

    // Set s and l as percentages and round all values
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // Create a string representation, for convenience
    let string = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';

    return { array: [h, s, l], string: string };
  }

  public static get claseAletaria(): string {
    var str = '';
    var ref = 'abcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < 10; i++) {
      str += ref.charAt(Math.floor(Math.random() * ref.length));
    }
    return str;
  }
  /**Insertar JS && CSS */

  public static addJSFilesToEndBody(arrayToEndBody: string[]) {
    //<link rel="stylesheet" href="../../dist-assets/css/plugins/cropper.min.css" />
    arrayToEndBody.forEach((e) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = e;
      document.body.appendChild(script);
    });
  }

  public static addJSTextToEndBody(ToEndBody: string) {
    //<link rel="stylesheet" href="../../dist-assets/css/plugins/cropper.min.css" />
    let script: HTMLScriptElement = document.createElement('script');
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }

  public static addCssFilesToEndHead(arrayToEndHead: string[]) {
    arrayToEndHead.forEach((e) => {
      let style: HTMLLinkElement = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.href = e;
      document.head.appendChild(style);
    });
  }

  public static addCssJsonFilesToEndHead(
    arrayToEndHead: {
      href: string;
      id: string;
    }[]
  ) {
    arrayToEndHead.forEach((e) => {
      let style: HTMLLinkElement = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.href = e.href;
      style.id = e.id;
      document.head.appendChild(style);
    });
  }

  public static addJSFilesToEndHead(texto) {
    let script: HTMLScriptElement = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = texto;
    document.head.appendChild(script);
  }

  public static addJSFilesToEndHeadArray(arrayToEndBody: string[]) {
    arrayToEndBody.forEach((e) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = e;
      document.head.appendChild(script);
    });
  }

  public static addMetaFilesToEndHeadArray(
    arrayToEndBody: {
      name: string;
      content: string;
    }[]
  ) {
    arrayToEndBody.forEach((e) => {
      let meta: HTMLMetaElement = document.createElement('meta');
      meta.name = e.name;
      meta.content = e.content;
      document.head.appendChild(meta);
    });
  }

  public static addStyleHead(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(`${css}`));
    document.head.appendChild(style);
  }

  public static menuDashboardActive(dataUri) {
    let lists: any = document.querySelectorAll('.ul-menu-store-dashboard li');
    for (var i = 0; i < lists.length; i++) {
      if (i == lists.length) {
        break;
      }
      if (lists[i].classList.contains('active') == true) {
        lists[i].classList.remove('active');
      }
      if (lists[i].dataset.uri == dataUri) {
        lists[i].classList.add('active');
      }
    }
  }

  /**Fin JS && CSS */
  public static loadingWaiting(): void {
    let loadingWaiting = document.getElementById('LOADING-WAINTING');
    if (loadingWaiting.classList.contains('d-none')) {
      loadingWaiting.classList.remove('d-none');
    } else {
      loadingWaiting.classList.add('d-none');
    }
  }

  public static loadingWaitingHide(): void {
    let loadingWaiting = document.getElementById('LOADING-WAINTING');
    if (loadingWaiting.classList.contains('d-none')) {
    } else {
      loadingWaiting.classList.add('d-none');
    }
  }

  public static loadingWaitingShow(): void {
    let loadingWaiting = document.getElementById('LOADING-WAINTING');
    if (loadingWaiting.classList.contains('d-none')) {
      loadingWaiting.classList.remove('d-none');
    } else {
    }
  }

  public static getBaseUrl(): string {
    const location = window.document.location;
    let base = `${location.protocol}//${location.hostname}:${location.port}/`;
    return base;
  }

  public static isMobile(): {
    Android: () => RegExpMatchArray;
    BlackBerry: () => RegExpMatchArray;
    iOS: () => RegExpMatchArray;
    Opera: () => RegExpMatchArray;
    Windows: () => RegExpMatchArray;
    any: () => RegExpMatchArray;
  } {
    const isMobile: {
      Android: () => RegExpMatchArray;
      BlackBerry: () => RegExpMatchArray;
      iOS: () => RegExpMatchArray;
      Opera: () => RegExpMatchArray;
      Windows: () => RegExpMatchArray;
      any: () => RegExpMatchArray;
    } = {
      Android: () => {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: () => {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: () => {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };
    return isMobile;
  }

  public static isBrowser() {
    const isBrowser = {
      Chrome: () => {
        return navigator.userAgent.match(/chrome/i);
      },
      Firefox: () => {
        return navigator.userAgent.match(/firefox/i);
      },
      Opera: () => {
        return navigator.userAgent.match(/opera/i);
      },
      IE: () => {
        return navigator.userAgent.match(/MSIE/i);
      },
      Safari: () => {
        return navigator.userAgent.match(/safari/i);
      },
      Edge: () => {
        return navigator.userAgent.match(/edge/i);
      },
      any: () => {
        return (
          isBrowser.Chrome() ||
          isBrowser.Firefox() ||
          isBrowser.Opera() ||
          isBrowser.IE() ||
          isBrowser.Safari() ||
          isBrowser.Edge()
        );
      },
    };
    return isBrowser;
  }

  public static getDayNow(){
    let date = new Date(); // Fecha actual

    let year = date.getFullYear();
    let month: number | string = date.getMonth() + 1; // Añadimos 1 porque los meses empiezan desde 0
    let day: number | string = date.getDate();

    // Aseguramos que el mes y el día siempre tengan dos dígitos
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    let fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
  }

  public static validatePassword(event: any) {
    var value = (event.target as HTMLInputElement).value; //+ ' | '

    var letter = document.getElementById('letter') as HTMLElement;
    var capital = document.getElementById('capital') as HTMLElement;
    var number = document.getElementById('number') as HTMLElement;
    var length = document.getElementById('length') as HTMLElement;

    var lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      letter.classList.remove('invalid');
      letter.classList.add('valid');
    } else {
      letter.classList.remove('valid');
      letter.classList.add('invalid');
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      capital.classList.remove('invalid');
      capital.classList.add('valid');
    } else {
      capital.classList.remove('valid');
      capital.classList.add('invalid');
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (value.match(numbers)) {
      number.classList.remove('invalid');
      number.classList.add('valid');
    } else {
      number.classList.remove('valid');
      number.classList.add('invalid');
    }

    // Validate length
    if (value.length >= 6) {
      length.classList.remove('invalid');
      length.classList.add('valid');
    } else {
      length.classList.remove('valid');
      length.classList.add('invalid');
    }
  }

  public static select(selector) {
    var elements = document.querySelectorAll(selector);

    if (elements.length > 1) {
      return elements;
    } else {
      return elements.item(0);
    }
  }
  public static hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  }

  public static toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
      elem.className += ' ' + className;
    }
  }
  public static toggleClasses(btnOpen, modal) {
    this.toggleClass(btnOpen, 'is-active');
    this.toggleClass(modal, 'is-active');
  }
  public static bufferToBase64(buffer, filetype) {
    return URL.createObjectURL(
      new Blob([buffer], { type: filetype } /* (1) */)
    );
  }
  public static hideModalDynamics(dynamics, modal) {
    dynamics.animate(
      modal,
      {
        opacity: 0,
        translateY: 100,
      },
      {
        type: dynamics.spring,
        frequency: 50,
        friction: 600,
        duration: 1500,
      }
    );
  }
  public static showBtnDynamics(dynamics, modal) {
    dynamics.animate(
      modal,
      {
        opacity: 0,
        translateY: 100,
      },
      {
        type: dynamics.spring,
        frequency: 50,
        friction: 600,
        duration: 1500,
      }
    );
  }

  public static showModalChildrenDynamics(dynamics, modalChildren) {
    for (var i = 0; i < modalChildren.length; i++) {
      var item = modalChildren[i];

      // Define initial properties
      dynamics.css(item, {
        opacity: 0,
        translateY: 30,
      });

      // Animate to final properties
      dynamics.animate(
        item,
        {
          opacity: 1,
          translateY: 0,
        },
        {
          type: dynamics.spring,
          frequency: 300,
          friction: 400,
          duration: 1000,
          delay: 100 + i * 40,
        }
      );
    }
  }
  public static showModalDynamics(dynamics, modal) {
    // Define initial properties
    dynamics.css(modal, {
      opacity: 0,
      scale: 0.5,
    });

    // Animate to final properties
    dynamics.animate(
      modal,
      {
        opacity: 1,
        scale: 1,
      },
      {
        type: dynamics.spring,
        frequency: 300,
        friction: 400,
        duration: 1000,
      }
    );
  }
  public static alertModalShow(btnOpen, modal, dynamics) {
    //var btnOpen = this.select(classOpen);
    //var modal = this.select(classModal);
    var modalChildren = modal.children;
    this.toggleClasses(btnOpen, modal);
    this.showModalDynamics(dynamics, modal);
    this.showModalChildrenDynamics(dynamics, modalChildren);
  }

  public static alertModalClose(btnClose, modal, dynamics) {
    //var modal = this.select(classModal);
    //var btnClose = this.select(classClose);
    this.hideModalDynamics(dynamics, modal);
    this.toggleClasses(btnClose, modal);
    /*let own = this;
      setTimeout(function(){
        own.toggleClasses(btnClose, modal);
        own.showBtnDynamics(dynamics,modal)
      },500);*/
  }
  public static resetSnapStore(APP_URL) {
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = APP_URL + 'favicon.ico';

    document.getElementById('icon-favicon').removeAttribute('href');
    document.getElementById('icon-favicon').setAttribute('href', 'favicon.ico');

    document
      .getElementById('favicon-16x16-theme')
      .setAttribute('href', APP_URL + 'assets/favicon/favicon-16x16.png');
    document
      .getElementById('favicon-32x32-theme')
      .setAttribute('href', APP_URL + 'assets/favicon/favicon-32x32.png');

    document
      .getElementById('safari-pinned-tab-theme')
      .setAttribute('content', 'var(--theme_color_second)');
    document
      .getElementById('msapplication-TileColor-theme')
      .setAttribute('content', 'var(--theme_color_first)');
    document
      .getElementById('theme-color-theme')
      .setAttribute('content', 'var(--theme_color_first)');

    document.documentElement.style.setProperty(
      '--theme_color_first',
      '#0b09a5'
    );
    document.documentElement.style.setProperty(
      '--theme_color_first_text',
      '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--theme_color_second',
      '#fb3366'
    );
    document.documentElement.style.setProperty(
      '--theme_color_second_text',
      '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--theme_color_background',
      '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--theme_color_background_text',
      '#000'
    );

    document.documentElement.style.setProperty('--theme_color_info', '#003473');
    document.documentElement.style.setProperty(
      '--theme_color_warning',
      '#FEC928'
    );
    document.documentElement.style.setProperty(
      '--theme_color_danger',
      '#f44336'
    );
    document.documentElement.style.setProperty(
      '--theme_color_success',
      '#009b37'
    );

    document.documentElement.style.setProperty(
      '--theme_color_light',
      '#e9ecef'
    );
    document.documentElement.style.setProperty(
      '--theme_color_light_text',
      '#000000'
    );

    CommonUtils.addStyleHead(`
      @import url("https://fonts.googleapis.com/css2?family=Saira");
        html,body {
          font-family: "Saira", sans-serif!important;
        }
      `);
  }

  public static getImageDefault200X200(APP_URL) {
    return APP_URL + 'assets/images/snapstore/placeholder-200X200.png';
  }
  public static getImageDefault100X100(APP_URL) {
    return APP_URL + 'assets/images/snapstore/placeholder-100X100.png';
  }

  public static insertAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👍 Agregado exitoso!!!</div> ';
  }
  public static noInsertAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👍 No agregado!!!</div> ';
  }

  public static updateAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👍 Editado exitoso!!!</div> ';
  }

  public static noUpdateAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👎 No editado!!!</div> ';
  }

  public static deleteAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👍 Eliminado exitoso!!!</div> ';
  }
  public static noDeleteAlert() {
    return '<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fas fa-times"></i></button>👍 No eliminado!!!</div> ';
  }
  public static getRandomMinToMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  public static validationAccessToken(accessToken) {
    let flag: boolean = false;
    if (accessToken != null) {
      if (
        accessToken.split(' ')[1] != null &&
        accessToken.split(' ')[1] != '' &&
        typeof accessToken.split(' ')[1] != 'undefined'
      ) {
        flag = true;
      }
    }
    return flag;
  }

  public static isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded || !decoded.exp) {
        return true;
      }
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp); // Convertir el tiempo de expiración de segundos a una fecha
      return !(date.valueOf() > new Date().valueOf());
    } catch (err) {
      return true;
    }
  }
}
// https://www.typescriptlang.org/docs/handbook/functions.html
/*public static data(): any {



     return {
       bootstrapFiles: bootstrapFile,
       cssToAdds: cssToAdd,
       fontKeys: fontKey,
       sassFunctionKeys: sassFunctionKey
     };
   }*/
