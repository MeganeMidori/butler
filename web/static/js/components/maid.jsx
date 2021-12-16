import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import MaidSearch from './maidSearch';
import Pagination from './pagination';

const durationObject = checkedInAt => moment.duration(moment().diff(checkedInAt));

const checkedInDuration = (checkedInAt) => {
  const duration = durationObject(checkedInAt);
  return duration.isValid() ? [duration.hours(), (`0${duration.minutes()}`).slice(-2)].join(':') : '';
};

const checkedInTime = (checkedInAt) => {
  const duration = durationObject(checkedInAt);
  return duration.isValid() ? moment(checkedInAt).format('LLLL') : '';
};

const tableComponent = ({
  maids, search, url, pageNumber, totalPages, token,
}) => (
  <div>
    <h2>Maid Check-In</h2>
    <MaidSearch search={search} />
    <Pagination
      url={url}
      pageNumber={pageNumber}
      totalPages={totalPages}
    />
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Checked In Since</th>
          <th>Status</th>

          <th />
        </tr>
      </thead>
      <tbody>
        {maids.map(maid => (
          <tr id={maid.id} key={maid.id}>
            <td>{maid.name}</td>
            <td title={maid.status === 'present' ? checkedInTime(maid.checked_in_at) : ''}>
              {maid.status === 'present' ? checkedInDuration(maid.checked_in_at) : ''}
            </td>
            <td>
              {maid.status === 'present' ? (
                <Button variant="primary" data-csrf={token} data-method="post" data-to={`/maids/${maid.id}/check-out`}>Check Out</Button>
              ) : (
                <Button variant="default" data-csrf={token} data-method="post" data-to={`/maids/${maid.id}/check-in`}>Check In</Button>
              )}
            </td>

            <td className="text-right">
              <span>
                <a href={`/maids/${maid.id}`}>Show</a>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Pagination
      url={url}
      pageNumber={pageNumber}
      totalPages={totalPages}
    />

    <div>
      <a href="/maids/new">New maid</a>
    </div>
  </div>
);

tableComponent.propTypes = {
  maids: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string,
  url: PropTypes.string,
  pageNumber: PropTypes.number,
  totalPages: PropTypes.number,
  token: PropTypes.string.isRequired,
};

tableComponent.defaultProps = {
  search: '',
  url: '/maid',
  pageNumber: 1,
  totalPages: 1,
};

export default tableComponent;
