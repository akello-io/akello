from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class GazePosition(BaseModel):
    x: float = Field(..., description="X-coordinate of gaze position")
    y: float = Field(..., description="Y-coordinate of gaze position")

class EyePosition(BaseModel):
    x: float = Field(..., description="X-coordinate of eye position")
    y: float = Field(..., description="Y-coordinate of eye position")
    z: Optional[float] = Field(None, description="Z-coordinate of eye position (if available)")

class Pupil(BaseModel):
    size: float = Field(..., description="Pupil size")
    diameter: Optional[float] = Field(None, description="Pupil diameter (if available)")

class EyeData(BaseModel):
    left: Optional[EyePosition] = Field(None, description="Left eye position")
    right: Optional[EyePosition] = Field(None, description="Right eye position")
    gaze: GazePosition = Field(..., description="Gaze position")
    pupil: Pupil = Field(..., description="Pupil information")

class Event(BaseModel):
    type: str = Field(..., description="Event type (e.g., 'fixation', 'saccade', 'blink')")
    start_time: datetime = Field(..., description="Event start time")
    end_time: Optional[datetime] = Field(None, description="Event end time (if applicable)")
    duration: Optional[float] = Field(None, description="Event duration in milliseconds")

class EDFSample(BaseModel):
    timestamp: datetime = Field(..., description="Timestamp of the sample")
    eye_data: EyeData = Field(..., description="Eye tracking data")
    events: List[Event] = Field(default_factory=list, description="List of events occurring at this sample")

class EDFSession(BaseModel):
    subject_id: str = Field(..., description="Unique identifier for the subject")
    session_start: datetime = Field(..., description="Start time of the session")
    session_end: Optional[datetime] = Field(None, description="End time of the session")
    samples: List[EDFSample] = Field(..., description="List of eye tracking samples")
    metadata: dict = Field(default_factory=dict, description="Additional metadata about the session")

# Example usage:
# session = EDFSession(
#     subject_id="participant_001",
#     session_start=datetime.now(),
#     samples=[
#         EDFSample(
#             timestamp=datetime.now(),
#             eye_data=EyeData(
#                 left=EyePosition(x=0.1, y=0.2, z=0.3),
#                 right=EyePosition(x=0.4, y=0.5, z=0.6),
#                 gaze=GazePosition(x=0.3, y=0.4),
#                 pupil=Pupil(size=3.5, diameter=7.0)
#             ),
#             events=[
#                 Event(type="fixation", start_time=datetime.now(), duration=250.0)
#             ]
#         )
#     ]
# )