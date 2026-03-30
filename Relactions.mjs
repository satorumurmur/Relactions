/*!
 *                                                                                                                         (℠)
 *  # Relactions: Easing Functions
 *
 *  * © Satoru Matsushima - https://github.com/satorumurmur/Relactions
 *  * Open source under the MIT license. - https://github.com/satorumurmur/Relactions/blob/main/LICENSE
 *  * Based on Robert Penner's Easing Functions. - https://robertpenner.com/easing/
 *
 */

export const Relactions = (
    ['Quad', 'Cubic', 'Quart', 'Quint'].map((Method, i) =>
      [ Method,  { __in: (P        ) => P ** (2 + i)                                                                                       } ]
    ).concat(Object.entries({
        Sine:    { _out: (P        ) => Math.sin(P * Math.PI / 2)                                                                          },
        Expo:    { __in: (P        ) => Math.exp(Math.LN2 * 10 * (P - 1))                                                                  }, // __in: (P        ) => 2 ** (10 * (P - 1))
        Circ:    { _out: (P        ) => Math.sqrt(P * (2 - P))                                                                             }, // _out: (P        ) => Math.sqrt(1 - (P - 1) ** 2)
        Back:    { __in: (P, _A = 1) => (P ** 3) * (1.70158 * _A + 1) - (P ** 2) * 1.70158 * _A,                                 _A: 1.525 },
        Elastic: { _out: (P, _A = 1) => Math.exp(Math.LN2 * -10 * P) * Math.sin((10 * P - .75 * _A) * Math.PI * 2 / 3 / _A) + 1, _A: 1.5   }, // _out: (P, _A = 1) => (2 ** (-10 * P)) * Math.sin((10 * P - .75 * _A) * Math.PI * 2 / 3 / _A) + 1
        Bounce:  { _out: (P        ) => { P *= 2.75;
            if(P < 2.75 - .25 * (1 + 2 + 4)) return (P                    ) ** 2                      ;
            if(P < 2.75 - .25 * (1 + 2    )) return (P - (3/2            )) ** 2 + (3/4              );
            if(P < 2.75 - .25              ) return (P - (3/2 + 3/4      )) ** 2 + (3/4 + 3/16       );
            /* else */                       return (P - (3/2 + 3/4 + 3/8)) ** 2 + (3/4 + 3/16 + 3/64);
        } }
    })).reduce((Relactions, [Method, { __in, _out, _A }]) => {
        if(__in) _out = (P, _A) => 1 - __in(1 - P, _A);
        else     __in = (P, _A) => 1 - _out(1 - P, _A);
        const [easeIn, easeOut, easeInOut, easeOutIn, MethodLC] = [
            (P) => P === 0 ? 0 : P === 1 ? 1 :                          __in( P              ),
            (P) => P === 0 ? 0 : P === 1 ? 1 :                          _out( P              ),
            (P) => P === 0 ? 0 : P === 1 ? 1 : P === .5 ? .5 : P < .5 ? __in( P       * 2, _A) / 2 :
            /**/                                                   .5 + _out((P - .5) * 2, _A) / 2,
            (P) => P === 0 ? 0 : P === 1 ? 1 : P === .5 ? .5 : P < .5 ? _out( P       * 2, _A) / 2 :
            /**/                                                   .5 + __in((P - .5) * 2, _A) / 2,
            Method.toLowerCase()
        ];
        return Object.assign(Relactions, {
            ['easeIn' + Method]: easeIn, ['easeOut' + Method]: easeOut, ['easeInOut' + Method]: easeInOut, ['easeOutIn' + Method]: easeOutIn,
            [MethodLC  +  'In']: easeIn, [MethodLC  +  'Out']: easeOut, [MethodLC  +  'InOut']: easeInOut, [MethodLC  +  'OutIn']: easeOutIn
        });
    }, {
        linear: (P) => P
    })
);

// {
//     linear,
//     easeInQuad    =    quadIn,  easeOutQuad    =    quadOut,  easeInOutQuad    =    quadInOut,  easeOutInQuad    =    quadOutIn,
//     easeInCubic   =   cubicIn,  easeOutCubic   =   cubicOut,  easeInOutCubic   =   cubicInOut,  easeOutInCubic   =   cubicOutIn,
//     easeInQuart   =   quartIn,  easeOutQuart   =   quartOut,  easeInOutQuart   =   quartInOut,  easeOutInQuart   =   quartOutIn,
//     easeInQuint   =   quintIn,  easeOutQuint   =   quintOut,  easeInOutQuint   =   quintInOut,  easeOutInQuint   =   quintOutIn,
//     easeInSine    =    sineIn,  easeOutSine    =    sineOut,  easeInOutSine    =    sineInOut,  easeOutInSine    =    sineOutIn,
//     easeInExpo    =    expoIn,  easeOutExpo    =    expoOut,  easeInOutExpo    =    expoInOut,  easeOutInExpo    =    expoOutIn,
//     easeInCirc    =    circIn,  easeOutCirc    =    circOut,  easeInOutCirc    =    circInOut,  easeOutInCirc    =    circOutIn,
//     easeInBack    =    backIn,  easeOutBack    =    backOut,  easeInOutBack    =    backInOut,  easeOutInBack    =    backOutIn,
//     easeInElastic = elasticIn,  easeOutElastic = elasticOut,  easeInOutElastic = elasticInOut,  easeOutInElastic = elasticOutIn,
//     easeInBounce  =  bounceIn,  easeOutBounce  =  bounceOut,  easeInOutBounce  =  bounceInOut,  easeOutInBounce  =  bounceOutIn
// }
