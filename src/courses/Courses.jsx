/* eslint-disable no-nested-ternary */
import { Container, Spinner, Card, SearchField } from "@edx/paragon";
import { useState } from "react";
import { FormattedMessage } from "@edx/frontend-platform/i18n";
import { useFetch } from "./hooks";

const Courses = () => {
  const [query, setQuery] = useState(null);
  const {
    response: courses,
    isLoading,
    error,
  } = useFetch({ url: "api/task1/list-filter", params: { search: query } });
  return (
    <Container>
      <SearchField
        onSubmit={(value) => setQuery(value)}
        label="Search:"
      />
      {isLoading ? (
        <Spinner
          animation="border"
          variant="danger"
          className="mr-3"
          screenReaderText="loading"
        />
      ) : error ? (
        <FormattedMessage
          defaultMessage="An Error Occured"
          id="error_message"
        />
      ) : (
        <Container>
          {courses.map((course) => (
            <Card isClickable key={course.name}>
              <Card.Header title={course.name} subtitle={course.number} />
              <Card.Section>
                Starts on {course.start_display}
                <div>
                  {course.pacing[0].toUpperCase() + course.pacing.substring(1)}
                  -paced course
                  {course.effort &&
                    `, Requires ${course.effort} min to complete`}
                </div>
              </Card.Section>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
};

export default Courses;
