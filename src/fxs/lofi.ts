import { FxDefinition } from '../types/FxDefinition';

export default [ 'lofi', {
  name: 'Lo-Fi',
  description: 'Make curve more crunchy.',
  params: {
    rate: { name: 'Frame Rate', type: 'float', default: 10.0, min: 0.0, max: 1000.0 },
    relative: { name: 'Relative', type: 'boolean', default: false },
    reso: { name: 'Reso Per Unit', type: 'float', default: 0.1, min: 0.0, max: 1000.0 },
    round: { name: 'Round', type: 'boolean', default: false }
  },
  func( context ) {
    let t;
    if ( context.params.rate === 0.0 ) {
      t = context.t;
    } else if ( context.params.relative ) {
      t = context.t0 + Math.floor(
        ( context.t - context.t0 ) * context.params.rate
      ) / context.params.rate;
    } else {
      t = Math.floor( ( context.t ) * context.params.rate ) / context.params.rate;
    }

    let v = context.getValue( t );
    if ( context.params.reso !== 0.0 ) {
      v = Math.floor(
        v * context.params.reso + ( context.params.round ? 0.5 : 0.0 )
      ) / context.params.reso;
    }
    return v;
  }
} as FxDefinition ];
