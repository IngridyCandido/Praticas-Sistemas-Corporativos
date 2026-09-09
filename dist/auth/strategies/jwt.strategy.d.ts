import { Strategy } from 'passport-jwt';
import { Papel } from '../../usuarios/usuarios.service';
type JwtPayload = {
    sub: number;
    email: string;
    papel: Papel;
};
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        id: number;
        email: string;
        papel: Papel;
    };
}
export {};
