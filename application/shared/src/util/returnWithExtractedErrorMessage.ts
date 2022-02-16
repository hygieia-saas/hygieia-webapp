const returnWithExtractedErrorMessage = <T>(
    e: unknown,
    fnIfExtracted: (msg: string) => T,
    fnIfNotExtracted: (msg: string) => T
): T => {
    if (e instanceof Error) {
        return fnIfExtracted(e.message);
    } else {
        return fnIfNotExtracted(JSON.stringify(e));
    }
};

export default returnWithExtractedErrorMessage;
