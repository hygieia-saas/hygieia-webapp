import { ERestApiDefaultRouteNames, getRestApiDefaultRouteName } from '../../src/routes/restApiDefaultRoutes';

test('finds the correct route name', () => {

    expect(getRestApiDefaultRouteName('POST', 'foo/')).toBe(null);

    expect(getRestApiDefaultRouteName('POST', 'users/')).toBe<ERestApiDefaultRouteNames>(ERestApiDefaultRouteNames.registerUser);

    expect(getRestApiDefaultRouteName('POST', 'anonymous-upload-file-check-slots/')).toBe<ERestApiDefaultRouteNames>(ERestApiDefaultRouteNames.createFileCheckSlotForAnonymousUpload);

    expect(
        getRestApiDefaultRouteName('GET', 'anonymous-upload-file-check-slots/5878d532-a0ac-11ec-b909-0242ac120002/status')
    ).toBe<ERestApiDefaultRouteNames>(
        ERestApiDefaultRouteNames.getFileCheckSlotForAnonymousUploadStatus
    );
});
