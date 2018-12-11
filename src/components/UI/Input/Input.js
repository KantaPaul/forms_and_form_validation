import React from 'react';
import classes from '../../../assets/css/style.scss';

class Input extends React.Component {
    render() {
        let inputElement = null;
        let inputClass = [classes.input];
        if (this.props.invaild && this.props.shuldValidate && this.props.touched) {
            inputClass.push(classes.invaild)
        }
        switch (this.props.elementType) {
            case ('input'):
                inputElement = <input
                    className={inputClass.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed} />;
                break;
            case ('textarea'):
                inputElement = <textarea
                    className={inputClass.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed} />;
                break;
            case ('select'):
                inputElement = (
                    <select
                        className={inputClass.join(' ')}
                        value={this.props.value}
                        onChange={this.props.changed}>
                        {this.props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                    </select>
                );
                break;
            default:
                inputElement = <input
                    className={inputClass.join(' ')}
                    {...this.props.elementConfig}
                    onChange={this.props.changed}
                    value={this.props.value} />
        }

        return (
            <div className={classes.inputWraper}>
                <label className={classes.label}>{this.props.elementConfig.placeholder}</label>
                {inputElement}
            </div>
        )
    }
}

export default Input;