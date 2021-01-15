// /* eslint-disable import/no-extraneous-dependencies */

import readme from './README.md';
import Paragraphs from '../../../components/atoms/Paragraphs.vue';

const component = () => {
  return {
    components: { Paragraphs },
    data: () => {
      return {
        sampleText: `Lorem ipsum dolor sit amet, nemore civibus disputando id vis, no quo laoreet mandamus vulputate, putant partiendo evertitur ei vim. Albucius mediocritatem has ad, laoreet oportere evertitur eu cum. His choro audiam an, ea mel utamur prompta debitis, decore partiendo reprehendunt qui an. Cu dolore everti mea. Quo in nulla utinam mnesarchum. Per hinc pericula ut.
Usu an iusto verear fastidii, pro illum voluptua at, ad sit denique offendit adolescens. Causae deleniti moderatius eu his, et quo nulla denique omnesque. Facilisis disputationi id est, no usu eirmod voluptua pericula, his modo alterum fabulas ne. Ignota detraxit quaerendum sed eu, exerci lucilius cum id. Veri urbanitas cu mel, eu feugait delicata tincidunt cum, his mutat lobortis scriptorem eu.
Aperiri alterum vis cu. In qui iudico utroque. Mea ei tamquam iudicabit reprehendunt, ocurreret constituam eu sea, ius an modo detracto. Molestie consetetur id eum. Vel quas oportere id.
His et erant iudico. Ad cum mentitum persequeris, facer tibique sapientem id vim. Pri eius euismod ut. Abhorreant complectitur at nam.
Iudico consequat sea id, has cibo tollit populo at. Nulla delenit ut qui, nam ei oratio dolore altera, sed an ipsum delicata. Vel errem alterum fastidii cu, cum viris reformidans at, ne qui animal oportere. His in fabulas dolores laboramus, ex pro facilisis persecuti, veniam fabulas instructior ea per. Mea odio fabulas constituam ex, in has iriure aliquando dissentiet.
Ei erat modus repudiandae vim, est ea debitis definiebas sadipscing. Oblique blandit ut sed. Gubergren disputando sed at. Pri minim habemus cu, ad odio copiosae nam.
Oportere concludaturque pro eu, quo an unum quas malorum. Ad sit eius error dissentiet, vero consetetur vituperatoribus pro et, ei quo vero ullum timeam. Eu primis contentiones qui, ut vim alia utinam sententiae, fabellas quaestio vim an. Nemore senserit cu eum, utroque nostrum cum ut, id dolor instructior mea.
Ne cum tritani feugait salutatus, qui id vocent deserunt constituam. Erat platonem maluisset id qui, ipsum audiam est no, ex duo dicit graeci probatus. Id munere feugait vix, eam sint quodsi accumsan at. Justo aperiam voluptatibus no vim, has in utroque contentiones, ei vix debet everti referrentur.
Purto elitr aliquid ad quo. Semper complectitur vix at. Mea ei ceteros erroribus instructior, eum legendos quaestio philosophia ea, dicta integre convenire usu te. Ei vix tibique omnesque, no duo scribentur vituperatoribus. Dicit platonem ad mel, vix propriae maluisset constituam ne.
Vis debet aeque civibus id, ad tota melius eum, qui cu altera mediocritatem. Facer menandri ius at, pri at cetero meliore prodesset. Mel te quot vidisse, viris nullam eum id, an quo equidem ancillae volutpat. In oblique diceret percipitur qui, duo utinam iriure suscipit in, vidit detracto te nam.`
      }
    },
    template: `
      <div>
        <Paragraphs :text="sampleText" />
      </div>
      `
  }
}

export default [readme, component];
