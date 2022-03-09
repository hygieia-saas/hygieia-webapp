import { ERouteNames, getRouteName } from '../../src/values/restApiDefaultRoutes';

test('finds the correct route name', () => {

    expect(getRouteName('POST', '/foo/')).toBe(null);

    expect(getRouteName('POST', '/users/')).toBe(ERouteNames.registerUser);
});
