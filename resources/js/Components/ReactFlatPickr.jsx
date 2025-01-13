import Flatpickr from 'react-flatpickr';
import moment from 'moment';

function ReactFlatPickr({
  handleChange,
  value = '',
  enableTime = false,
  altInput = false,
  altFormat = 'F j, Y',
  mode = 'single',
  dateFormat = 'Y-m-d',
  className = '',
  ...props
}) {
  const handleFlatDatePickr = data => {
    if (mode === 'single') {
      const [date] = data;
      handleChange(date?.toDateString());
    } else {
      let dates = data?.map(date => date?.toDateString());
      handleChange(dates);
    }
  };

  const handleValueDatePickr = dateValue => {
    let value = [];
    if (dateValue) {
      if (Array.isArray(dateValue)) {
        value = dateValue?.map(date => moment(date)?.toISOString());
      } else {
        value = moment(dateValue).toISOString();
      }
    }
    return value;
  };
  return (
    <Flatpickr
      {...props}
      value={handleValueDatePickr(value)}
      onChange={data => handleFlatDatePickr(data)}
      data-enable-time={enableTime}
      data-alt-input={altInput}
      data-alt-format={altFormat}
      data-mode={mode}
      data-date-format={dateFormat}
      className={`block w-full border-gray-100 focus:border-greenVogue-100 focus:ring-greenVogue-100 rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 ${className}`}
    />
  );
}

export default ReactFlatPickr;
