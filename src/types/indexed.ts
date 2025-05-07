type Indexed<T = unknown> = {
    [key in string]: T;
};

export default Indexed;
