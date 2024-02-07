import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { EasingNode, spring, timing, Value } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const styledTheme = {
    LIGHT: {
        background: '#FFFFFF',
        textColor: '#000000',
        placeholderTextColor: '#8E8E93',
        textInputBackground: "rgba(142,142,147,0.12)",
        searchFill: '#8E8E93',
    },
    DARK: {
        background: '#000000',
        textColor: '#FFFFFF',
        placeholderTextColor: '#636366',
        textInputBackground: "rgba(44,44,46,0.8)",
        searchFill: '#b0b0b2',
    }
}

const textInputWidth = new Value(0);
const cancelTextOpacity = new Value(0);

const SearchComponent = (props: any) => {
    let searchTextInput: any = useRef();
    const [searchInputFocussed, setSearchInputFocussed] = useState(false);
    const width = useWindowDimensions().width;
    const memoizedTextInputOnFocusWidth = useMemo(() => width - (50 + 32 + 32), [width]);
    const memoizedTextInputOnBlurWidth = useMemo(() => width - 32, [width]);
    const focusTextInput = useCallback(() => setSearchInputFocussed(true), []);
    const blurTextInput = useCallback(() => setSearchInputFocussed(false), []);

    const handleChange = useCallback((e: any) => {
        props?.onChange(e);
    }, [props?.onChange]);

    const handleClearSearch = useCallback(() => {
        props?.onSearchClear();
    }, [])

    const handleSearch = useCallback(() => {
        props?.handleSearch();
    }, [])

    useEffect(() => {
        if (searchInputFocussed) {

            spring(textInputWidth, {
                toValue: memoizedTextInputOnFocusWidth,
                mass: 1,
                stiffness: 120,
                damping: 20,
            } as any).start();

            timing(cancelTextOpacity, {
                toValue: 1,
                duration: 200,
                easing: EasingNode.linear
            } as any).start();

        } else {
            spring(textInputWidth, {
                toValue: memoizedTextInputOnBlurWidth,
                mass: 1,
                stiffness: 120,
                damping: 20,
            } as any).start();
            timing(cancelTextOpacity, {
                toValue: 0,
                duration: 200,
                easing: EasingNode.linear
            } as any).start();
        }
    }, [searchInputFocussed]);
    return (
        <Animated.View style={[styles.searchInputWrapper]}>
            <Animated.View style={styles.searchIconWrapper}>
                <Ionicons
                    name="md-search"
                    size={24}
                    color={'#ccc'}
                />
            </Animated.View>
            <Animated.View style={{ width: textInputWidth, paddingVertical: 4 }}>
                <TextInput
                    autoCorrect={false}
                    autoComplete='off'
                    value={props?.value}
                    onChange={handleChange}
                    ref={ref => searchTextInput = ref}
                    onFocus={focusTextInput}
                    onBlur={blurTextInput}
                    style={[
                        styles.searchInputStyle,
                        // {
                        //     backgroundColor: styledTheme[props?.theme].textInputBackground,
                        //     color: styledTheme[props?.theme].textColor,
                        // }
                    ]}
                    placeholder={props?.placeholder}
                    placeholderTextColor={props?.placeholderTextColor}
                />
                {
                    (searchInputFocussed && props?.value?.length > 0) && (
                        <TouchableOpacity style={styles.closeIconWrapper} onPress={handleClearSearch}>
                            <Ionicons
                                name="md-close"
                                size={24}
                                color={'#ccc'}
                            />
                        </TouchableOpacity>
                    )
                }
            </Animated.View>
            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center' }} onPress={handleSearch}>
                <Animated.Text style={{ paddingLeft: 16, fontSize: 17, color: '#007AFF', opacity: cancelTextOpacity }}>
                    Ara
                </Animated.Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    searchInputWrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 10,
    },
    searchInputStyle: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: 0.5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        paddingLeft: 32
    },
    searchIconWrapper: {
        position: 'absolute',
        left: 25,
        top: Platform.OS === 'android' ? 21 : 18
    },
    closeIconWrapper: {
        position: 'absolute',
        right: 8,
        top: Platform.OS === 'android' ? 21 : 18
    }
})


SearchComponent.propTypes = {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSearchClear: PropTypes.func,
    theme: PropTypes.oneOf(['LIGHT', 'DARK']),
    handleSearch: PropTypes.func,
}


SearchComponent.defaultProps = {
    placeholder: 'En az üç harf yazınız!',
    placeholderTextColor: null,
    onChange: () => { },
    value: '',
    onSearchClear: () => { },
    theme: 'LIGHT',
    handleSearch: () => { },
}

export default SearchComponent;